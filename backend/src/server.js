import './config/env.js'
import { validarEntorno } from './config/env.js'
import { conectarDB } from './config/db.js'
import app from './app.js'
import mongoose from 'mongoose'
import User from './models/User.js'

try {
  validarEntorno()
  await conectarDB()
  await User.init() // Crea el índice único de correo antes de aceptar registros.
  const port = Number(process.env.PORT || 4000)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT no es válido.')
  const servidor = app.listen(port, () => console.log('API disponible en http://localhost:' + port))
  servidor.on('error', () => {
    console.error('No se pudo abrir el puerto del servidor.')
    process.exit(1)
  })
} catch {
  console.error('No se pudo iniciar la API. Revisa backend/.env, el acceso de red de Atlas y las credenciales.')
  process.exitCode = 1
  await mongoose.disconnect()
}
