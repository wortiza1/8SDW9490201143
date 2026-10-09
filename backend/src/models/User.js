import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, maxlength: 120 },
  correo: {
    type: String, required: true, trim: true, lowercase: true, unique: true,
    maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  // Solo se almacena el hash. No se incluye al consultar el perfil.
  password: { type: String, required: true, select: false },
  rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
}, {
  timestamps: true,
  toJSON: {
    transform(documento, objeto) {
      objeto.id = objeto._id.toString()
      delete objeto._id
      delete objeto.__v
      delete objeto.password
      return objeto
    },
  },
})

export default mongoose.model('User', userSchema)
