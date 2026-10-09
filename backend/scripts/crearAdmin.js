import '../src/config/env.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { validarEntorno } from '../src/config/env.js'
import { conectarDB } from '../src/config/db.js'
import User from '../src/models/User.js'

try {
  validarEntorno()
  const { ADMIN_NOMBRE, ADMIN_CORREO, ADMIN_PASSWORD } = process.env
  if (!ADMIN_NOMBRE?.trim() || !ADMIN_CORREO?.trim() || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 6 || ADMIN_PASSWORD.length > 128) {
    throw new Error('Completa ADMIN_NOMBRE, ADMIN_CORREO y ADMIN_PASSWORD en backend/.env.')
  }
  await conectarDB()
  await User.init()
  const correo = ADMIN_CORREO.trim().toLowerCase()
  if (await User.exists({ correo })) {
    console.log('Ese correo ya existe. No se modificó el usuario ni su rol.')
  } else {
    await User.create({ nombre: ADMIN_NOMBRE, correo, password: await bcrypt.hash(ADMIN_PASSWORD, 12), rol: 'admin' })
    console.log('Administrador creado. Puedes quitar ADMIN_PASSWORD del .env después de usar este comando.')
  }
} catch (error) {
  console.error('Tipo:', error.name)
  console.error('Código:', error.code ?? error.cause?.code ?? 'Sin código')
  if (error.name === 'ValidationError') {
    console.error('Campos que debes revisar:', Object.keys(error.errors).join(', '))
  }
  console.error('No se pudo crear el administrador. Revisa el .env, el correo y la conexión.')
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
