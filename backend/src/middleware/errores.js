export default function manejarError(error, req, res, next) {
  if (error.name === 'MulterError') {
    return res.status(400).json({ mensaje: error.code === 'LIMIT_FILE_SIZE'
      ? 'La imagen debe pesar como máximo 5 MB.' : 'Sube una sola imagen usando el selector de archivos.' })
  }
  if (error.code === 11000) return res.status(409).json({ mensaje: 'El correo ya está registrado.' })
  if (error.name === 'ValidationError') {
    return res.status(400).json({ mensaje: Object.values(error.errors).map((detalle) => detalle.message).join(' ') })
  }
  if (error.name === 'CastError' || error.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'Los datos enviados no son válidos.' })
  }
  if (error.type === 'entity.too.large') return res.status(413).json({ mensaje: 'La petición es demasiado grande.' })
  if (error.status) return res.status(error.status).json({ mensaje: error.message })
  // No exponemos cadenas de conexión ni mensajes internos del driver.
  console.error('Error interno de la API:', error.name)
  res.status(500).json({ mensaje: 'No se pudo completar la operación. Intenta de nuevo.' })
}
