import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import recursoRoutes from './routes/recursoRoutes.js'
import manejarError from './middleware/errores.js'
import imagenRoutes from './routes/imagenRoutes.js'
import { carpetaImagenes } from './config/imagenes.js'

const app = express()
app.disable('x-powered-by')
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '50kb' }))
app.use('/uploads', express.static(carpetaImagenes, {
  dotfiles: 'deny',
  setHeaders(res) { res.setHeader('X-Content-Type-Options', 'nosniff') },
}))

app.get('/api/health', (req, res) => {
  const conectado = mongoose.connection.readyState === 1
  res.status(conectado ? 200 : 503).json({ conectado })
})
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ mensaje: 'La base de datos no está disponible.' })
  next()
})
app.use('/api/auth', authRoutes)
app.use('/api/recursos', recursoRoutes)
app.use('/api/imagenes', imagenRoutes)
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada.' }))
app.use(manejarError)
export default app
