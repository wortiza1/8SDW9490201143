import '../src/config/env.js'
import mongoose from 'mongoose'
import { validarEntorno } from '../src/config/env.js'
import { conectarDB } from '../src/config/db.js'
import Recurso from '../src/models/Recurso.js'

try {
  validarEntorno()
  await conectarDB()
  await mongoose.connection.db.command({ ping: 1 })
  console.log('Ping correcto. La conexión y la autenticación funcionan.')
  console.log('Productos guardados:', await Recurso.countDocuments())
} catch (error) {
  console.error('No se pudo comprobar la conexión:', error.name)
  console.error('Código:', error.code ?? error.cause?.code ?? 'Sin código')
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
