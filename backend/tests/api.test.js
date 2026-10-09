import test, { afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import app from '../src/app.js'
import User from '../src/models/User.js'
import Recurso from '../src/models/Recurso.js'
import { crearToken } from '../src/middleware/auth.js'
import { crearFiltro, datosRecurso } from '../src/controllers/recursoController.js'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { carpetaImagenes } from '../src/config/imagenes.js'

process.env.JWT_SECRET = 'secreto-exclusivo-de-pruebas-ninguna-cuenta-real'
const id = '507f1f77bcf86cd799439011'
const producto = { nombre: 'Producto de prueba', categoria: 'torso', precio: 120, descripcion: 'Descripción' }

afterEach(() => {
  mock.restoreAll()
  mongoose.connection.readyState = 0
})

function conectarSimulado() {
  mongoose.connection.readyState = 1
}
function usuarioSimulado(rol = 'cliente') {
  return new User({ _id: id, nombre: 'Usuario', correo: 'usuario@ejemplo.com', password: 'hash', rol })
}
function tokenDe(rol) {
  const usuario = usuarioSimulado(rol)
  mock.method(User, 'findById', async () => usuario)
  return crearToken(usuario)
}

test('sin MongoDB, la API responde 503 de manera explícita', async () => {
  const res = await request(app).get('/api/recursos')
  assert.equal(res.status, 503)
  assert.equal(res.body.mensaje, 'La base de datos no está disponible.')
})

test('registro: fuerza rol cliente y guarda un hash que no se devuelve', async () => {
  conectarSimulado()
  let guardado
  mock.method(User, 'create', async (datos) => {
    guardado = datos
    return new User({ ...datos, _id: id })
  })
  const res = await request(app).post('/api/auth/register')
    .send({ nombre: 'Nueva cuenta', correo: 'NUEVA@EJEMPLO.COM', password: 'clave123', rol: 'admin' })
  assert.equal(res.status, 201)
  assert.equal(guardado.rol, 'cliente')
  assert.equal(guardado.correo, 'nueva@ejemplo.com')
  assert.notEqual(guardado.password, 'clave123')
  assert.equal(await bcrypt.compare('clave123', guardado.password), true)
  assert.equal(res.body.usuario.password, undefined)
  assert.equal(jwt.verify(res.body.token, process.env.JWT_SECRET).sub, id)
})

test('login devuelve 401 con contraseña incorrecta y usuario verificado con contraseña correcta', async () => {
  conectarSimulado()
  const usuario = new User({ _id: id, nombre: 'Usuario', correo: 'usuario@ejemplo.com', password: await bcrypt.hash('clave123', 4), rol: 'cliente' })
  mock.method(User, 'findOne', () => ({ select: async () => usuario }))
  const fallo = await request(app).post('/api/auth/login').send({ correo: usuario.correo, password: 'incorrecta' })
  assert.equal(fallo.status, 401)
  const exito = await request(app).post('/api/auth/login').send({ correo: usuario.correo, password: 'clave123' })
  assert.equal(exito.status, 200)
  assert.equal(exito.body.usuario.correo, usuario.correo)
  assert.equal(exito.body.usuario.password, undefined)
  assert.ok(exito.body.token)
})

test('el perfil consulta el usuario autenticado y no devuelve la contraseña', async () => {
  conectarSimulado()
  const token = tokenDe('cliente')
  const res = await request(app).get('/api/auth/me').set('Authorization', 'Bearer ' + token)
  assert.equal(res.status, 200)
  assert.equal(User.findById.mock.calls[0].arguments[0], id)
  assert.equal(res.body.usuario.rol, 'cliente')
  assert.equal(res.body.usuario.password, undefined)
})

test('las escrituras rechazan visitantes, tokens inválidos y clientes', async () => {
  conectarSimulado()
  const anonimo = await request(app).post('/api/recursos').send(producto)
  assert.equal(anonimo.status, 401)
  const invalido = await request(app).post('/api/recursos').set('Authorization', 'Bearer invalido').send(producto)
  assert.equal(invalido.status, 401)
  const token = tokenDe('cliente')
  const cliente = await request(app).post('/api/recursos').set('Authorization', 'Bearer ' + token).send(producto)
  assert.equal(cliente.status, 403)
})

test('un administrador puede crear, actualizar y eliminar recursos', async () => {
  conectarSimulado()
  const token = tokenDe('admin')
  mock.method(Recurso, 'create', async (datos) => new Recurso({ _id: id, ...datos }))
  mock.method(Recurso, 'findByIdAndUpdate', async (recursoId, cambio) => new Recurso({ _id: recursoId, ...producto, ...cambio.$set }))
  mock.method(Recurso, 'findByIdAndDelete', async () => new Recurso({ _id: id, ...producto }))
  const crear = await request(app).post('/api/recursos').set('Authorization', 'Bearer ' + token).send(producto)
  assert.equal(crear.status, 201)
  assert.equal(crear.body.id, id)
  const editar = await request(app).put('/api/recursos/' + id).set('Authorization', 'Bearer ' + token).send({ precio: 150 })
  assert.equal(editar.status, 200)
  assert.equal(editar.body.precio, 150)
  assert.equal(Recurso.findByIdAndUpdate.mock.calls[0].arguments[2].runValidators, true)
  const eliminar = await request(app).delete('/api/recursos/' + id).set('Authorization', 'Bearer ' + token)
  assert.equal(eliminar.status, 204)
})

test('lista con filtros, detalle inexistente y path inválido', async () => {
  conectarSimulado()
  let filtroRecibido
  mock.method(Recurso, 'find', (filtro) => {
    filtroRecibido = filtro
    return { sort: async () => [new Recurso({ _id: id, ...producto })] }
  })
  mock.method(Recurso, 'findById', async () => null)
  const listado = await request(app).get('/api/recursos?categoria=torso&q=Producto&destacado=true')
  assert.equal(listado.status, 200)
  assert.equal(filtroRecibido.categoria, 'torso')
  assert.equal(filtroRecibido.destacado, true)
  assert.equal(listado.body[0].id, id)
  assert.equal((await request(app).get('/api/recursos/' + id)).status, 404)
  assert.equal((await request(app).get('/api/recursos/id-invalido')).status, 400)
})

test('no se aceptan operadores de MongoDB, precios negativos ni filtros arbitrarios', () => {
  assert.throws(() => datosRecurso({ $set: producto }), { status: 400 })
  assert.throws(() => datosRecurso({ precio: -1 }), { status: 400 })
  assert.throws(() => crearFiltro({ categoria: { $ne: '' } }), { status: 400 })
  assert.throws(() => crearFiltro({ destacado: 'otro' }), { status: 400 })
  const filtro = crearFiltro({ q: '.*[x]' })
  assert.equal(new RegExp(filtro.nombre.$regex).test('cualquier nombre'), false)
  assert.equal(new RegExp(filtro.nombre.$regex).test('Producto .*[x]'), true)
})

test('los modelos validan el correo y los datos del producto', async () => {
  await assert.rejects(new User({ nombre: 'Nombre', correo: 'invalido', password: 'hash' }).validate())
  await assert.rejects(new Recurso({ ...producto, categoria: 'otra' }).validate())
  await assert.rejects(new Recurso({ ...producto, imagen: 'javascript:alert(1)' }).validate())
})

const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jR3cAAAAASUVORK5CYII=', 'base64')

test('el administrador sube una imagen, se puede mostrar y su ruta es válida para un producto', async () => {
  conectarSimulado()
  const token = tokenDe('admin')
  let nombre
  try {
    const subida = await request(app).post('/api/imagenes').set('Authorization', 'Bearer ' + token)
      .attach('imagen', png, { filename: 'foto.png', contentType: 'image/png' })
    assert.equal(subida.status, 201)
    assert.match(subida.body.imagen, /^\/uploads\/[a-f0-9-]+\.png$/)
    nombre = subida.body.imagen.split('/').pop()
    await new Recurso({ ...producto, imagen: subida.body.imagen }).validate()
    const lectura = await request(app).get(subida.body.imagen)
    assert.equal(lectura.status, 200)
    assert.match(lectura.headers['content-type'], /image\/png/)
    assert.equal(lectura.headers['x-content-type-options'], 'nosniff')
    assert.deepEqual(lectura.body, png)
  } finally {
    if (nombre) await unlink(join(carpetaImagenes, nombre))
  }
})

test('la subida rechaza visitantes, clientes y archivos que fingen ser imágenes', async () => {
  conectarSimulado()
  const visitante = await request(app).post('/api/imagenes').attach('imagen', png, 'foto.png')
  assert.equal(visitante.status, 401)
  const cliente = await request(app).post('/api/imagenes').set('Authorization', 'Bearer ' + tokenDe('cliente'))
    .attach('imagen', png, 'foto.png')
  assert.equal(cliente.status, 403)
  mock.restoreAll()
  const falso = await request(app).post('/api/imagenes').set('Authorization', 'Bearer ' + tokenDe('admin'))
    .attach('imagen', Buffer.from('<script>archivo incorrecto</script>'), { filename: 'foto.png', contentType: 'image/png' })
  assert.equal(falso.status, 400)
})

test('la subida limita el tamaño y exige seleccionar un archivo', async () => {
  conectarSimulado()
  const token = tokenDe('admin')
  const vacia = await request(app).post('/api/imagenes').set('Authorization', 'Bearer ' + token)
  assert.equal(vacia.status, 400)
  const grande = await request(app).post('/api/imagenes').set('Authorization', 'Bearer ' + token)
    .attach('imagen', Buffer.alloc(5 * 1024 * 1024 + 1), { filename: 'grande.png', contentType: 'image/png' })
  assert.equal(grande.status, 400)
  assert.match(grande.body.mensaje, /5 MB/)
})
