import '../src/config/env.js'
import mongoose from 'mongoose'
import { validarEntorno } from '../src/config/env.js'
import { conectarDB } from '../src/config/db.js'
import Recurso from '../src/models/Recurso.js'
import { productos } from './productosIniciales.js'

try {
  validarEntorno()
  await conectarDB()
  if (await Recurso.countDocuments() > 0) {
    console.log('El catálogo ya tiene productos. No se insertó ni eliminó nada.')
  } else {
    await Recurso.insertMany(productos.map(({ id, ...producto }) => producto))
    console.log('Se guardaron ' + productos.length + ' productos en MongoDB.')
  }
} catch (error) {
  console.error('Tipo',error.name)
  console.error('Codigo',error.code ?? error.cause?.code ?? 'Sin codigo')
  console.error('No se pudo cargar el catálogo. Revisa el .env y la conexión a Atlas.')
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
