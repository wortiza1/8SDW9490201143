import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { crearToken } from '../middleware/auth.js'

function credencialesValidas(correo, password) {
  return typeof correo === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
    && correo.length <= 254 && typeof password === 'string'
    && password.length >= 6 && password.length <= 128
}

export async function register(req, res) {
  const { nombre, correo, password } = req.body || {}
  if (typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 120 || !credencialesValidas(correo, password)) {
    return res.status(400).json({ mensaje: 'Ingresa nombre, correo válido y contraseña de 6 a 128 caracteres.' })
  }
  // Se ignora cualquier rol enviado desde el navegador.
  const usuario = await User.create({
    nombre: nombre.trim(), correo: correo.trim().toLowerCase(),
    password: await bcrypt.hash(password, 12), rol: 'cliente',
  })
  res.status(201).json({ usuario: usuario.toJSON(), token: crearToken(usuario) })
}

export async function login(req, res) {
  const { correo, password } = req.body || {}
  if (!credencialesValidas(correo, password)) {
    return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' })
  }
  const usuario = await User.findOne({ correo: correo.trim().toLowerCase() }).select('+password')
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' })
  }
  res.json({ usuario: usuario.toJSON(), token: crearToken(usuario) })
}

export function perfil(req, res) {
  res.json({ usuario: req.usuario.toJSON() })
}
