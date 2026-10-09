import test, { afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import { apiRequest, imagenUrl } from '../src/services/api.js'

afterEach(() => mock.restoreAll())

test('fetch manda el token y el JSON del formulario a la API', async () => {
  let recibida
  mock.method(globalThis, 'fetch', async (url, opciones) => {
    recibida = { url, opciones }
    return { status: 201, ok: true, json: async () => ({ id: 'producto' }) }
  })
  const datos = await apiRequest('/recursos', { method: 'POST', token: 'sesion', body: { nombre: 'Nuevo' } })
  assert.equal(recibida.url, 'http://localhost:4000/api/recursos')
  assert.equal(recibida.opciones.headers.Authorization, 'Bearer sesion')
  assert.deepEqual(JSON.parse(recibida.opciones.body), { nombre: 'Nuevo' })
  assert.equal(datos.id, 'producto')
})

test('un 401 conserva el mensaje contextual y un DELETE 204 no intenta leer JSON', async () => {
  mock.method(globalThis, 'fetch', async () => ({ status: 401, ok: false, json: async () => ({ mensaje: 'Credenciales incorrectas' }) }))
  await assert.rejects(apiRequest('/auth/login'), { status: 401, message: 'Credenciales incorrectas' })
  mock.restoreAll()
  mock.method(globalThis, 'fetch', async () => ({ status: 204, ok: true }))
  assert.equal(await apiRequest('/recursos/id', { method: 'DELETE', token: 'sesion' }), null)
})

test('si el backend está apagado muestra un error de conexión comprensible', async () => {
  mock.method(globalThis, 'fetch', async () => { throw new TypeError('Failed to fetch') })
  await assert.rejects(apiRequest('/recursos'), { message: 'No se pudo conectar con la API. Comprueba que el backend esté encendido.' })
})

test('la imagen se envía como FormData dejando que el navegador ponga el boundary', async () => {
  const datos = new FormData()
  datos.append('imagen', new Blob(['imagen'], { type: 'image/png' }), 'foto.png')
  let opciones
  mock.method(globalThis, 'fetch', async (url, recibidas) => {
    opciones = recibidas
    return { status: 201, ok: true, json: async () => ({ imagen: '/uploads/foto.png' }) }
  })
  await apiRequest('/imagenes', { method: 'POST', token: 'sesion', body: datos })
  assert.equal(opciones.body, datos)
  assert.equal(opciones.headers['Content-Type'], undefined)
  assert.equal(opciones.headers.Authorization, 'Bearer sesion')
})

test('las imágenes subidas usan el backend y las originales conservan su dirección', () => {
  assert.equal(imagenUrl('/uploads/foto.png'), 'http://localhost:4000/uploads/foto.png')
  assert.equal(imagenUrl('/img/producto1.jfif'), '/img/producto1.jfif')
  assert.equal(imagenUrl('https://ejemplo.com/foto.png'), 'https://ejemplo.com/foto.png')
})
