import Recurso, { categorias } from '../models/Recurso.js'

const campos = ['nombre', 'categoria', 'precio', 'descripcion', 'detalle', 'imagen', 'badge', 'destacado']

export function datosRecurso(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw Object.assign(new Error('Envía un objeto con los datos del producto.'), { status: 400 })
  }
  if (!Object.keys(body).length || Object.keys(body).some((campo) => !campos.includes(campo))) {
    throw Object.assign(new Error('El formulario contiene campos no permitidos o está vacío.'), { status: 400 })
  }
  for (const [campo, valor] of Object.entries(body)) {
    const valido = campo === 'precio' ? typeof valor === 'number' && Number.isFinite(valor) && valor >= 0
      : campo === 'destacado' ? typeof valor === 'boolean' : typeof valor === 'string'
    if (!valido) throw Object.assign(new Error('Revisa el campo ' + campo + '.'), { status: 400 })
  }
  return Object.fromEntries(campos.filter((campo) => body[campo] !== undefined).map((campo) => [campo, body[campo]]))
}

export function crearFiltro(query) {
  const filtro = {}
  if (query.categoria !== undefined) {
    if (!categorias.includes(query.categoria)) throw Object.assign(new Error('Categoría inválida.'), { status: 400 })
    filtro.categoria = query.categoria
  }
  if (query.destacado !== undefined) {
    if (!['true', 'false'].includes(query.destacado)) throw Object.assign(new Error('destacado debe ser true o false.'), { status: 400 })
    filtro.destacado = query.destacado === 'true'
  }
  if (query.q !== undefined) {
    if (typeof query.q !== 'string' || query.q.length > 80) throw Object.assign(new Error('La búsqueda admite hasta 80 caracteres.'), { status: 400 })
    // Buscamos texto literal, sin aceptar operadores de MongoDB ni expresiones del usuario.
    const texto = query.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    filtro.nombre = { $regex: texto, $options: 'i' }
  }
  return filtro
}

export async function listar(req, res) {
  const productos = await Recurso.find(crearFiltro(req.query)).sort({ createdAt: -1 })
  res.json(productos)
}

export async function detalle(req, res) {
  const producto = await Recurso.findById(req.params.id)
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' })
  res.json(producto)
}

export async function crear(req, res) {
  const producto = await Recurso.create(datosRecurso(req.body))
  res.status(201).json(producto)
}

export async function actualizar(req, res) {
  const producto = await Recurso.findByIdAndUpdate(req.params.id,
    { $set: datosRecurso(req.body) }, { new: true, runValidators: true })
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' })
  res.json(producto)
}

export async function eliminar(req, res) {
  const producto = await Recurso.findByIdAndDelete(req.params.id)
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado.' })
  res.status(204).end()
}
