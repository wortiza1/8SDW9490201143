import { Router } from 'express'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { carpetaImagenes } from '../config/imagenes.js'
import { autenticar, soloAdmin } from '../middleware/auth.js'

const router = Router()
const recibirImagen = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 },
  fileFilter(req, archivo, siguiente) {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(archivo.mimetype)) {
      return siguiente(Object.assign(new Error('Selecciona una imagen JPG, PNG, WEBP o GIF.'), { status: 400 }))
    }
    siguiente(null, true)
  },
})

// Comprobamos el contenido y asignamos un nombre propio, sin usar la ruta del usuario.
function extensionImagen(buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'png'
  if (buffer.length >= 3 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return 'jpg'
  if (['GIF87a', 'GIF89a'].includes(buffer.subarray(0, 6).toString())) return 'gif'
  if (buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') return 'webp'
  return null
}

router.post('/', autenticar, soloAdmin, recibirImagen.single('imagen'), async (req, res) => {
  if (!req.file) return res.status(400).json({ mensaje: 'Selecciona una imagen.' })
  const extension = extensionImagen(req.file.buffer)
  if (!extension) return res.status(400).json({ mensaje: 'El archivo no es una imagen JPG, PNG, WEBP o GIF válida.' })
  await mkdir(carpetaImagenes, { recursive: true })
  const nombre = randomUUID() + '.' + extension
  await writeFile(join(carpetaImagenes, nombre), req.file.buffer)
  res.status(201).json({ imagen: '/uploads/' + nombre })
})

export default router
