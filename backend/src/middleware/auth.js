import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export function crearToken(usuario) {
  return jwt.sign({ sub: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' })
}

export async function autenticar(req, res, next) {
  const encabezado = req.get('Authorization') || ''
  if (!encabezado.startsWith('Bearer ')) return res.status(401).json({ mensaje: 'Inicia sesión para continuar.' })
  let contenido
  try {
    contenido = jwt.verify(encabezado.slice(7), process.env.JWT_SECRET, { algorithms: ['HS256'] })
  } catch {
    return res.status(401).json({ mensaje: 'La sesión expiró o no es válida. Inicia sesión de nuevo.' })
  }
  // Se consulta MongoDB en cada petición protegida: el rol no se confía al cliente.
  const usuario = await User.findById(contenido.sub)
  if (!usuario) return res.status(401).json({ mensaje: 'El usuario ya no existe.' })
  req.usuario = usuario
  next()
}

export function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ mensaje: 'Solo un administrador puede modificar productos.' })
  next()
}
