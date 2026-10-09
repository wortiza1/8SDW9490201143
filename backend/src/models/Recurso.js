import mongoose from 'mongoose'

export const categorias = ['torso', 'accesorios', 'pantalones', 'zapatos']

const recursoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true, maxlength: 120 },
  categoria: { type: String, required: true, enum: categorias },
  precio: { type: Number, required: true, min: 0 },
  descripcion: { type: String, required: true, trim: true, maxlength: 500 },
  detalle: { type: String, trim: true, maxlength: 2000, default: '' },
  imagen: {
    type: String, trim: true, maxlength: 500, default: '/img/producto1.jfif',
    validate: {
      validator: (valor) => /^\/img\/[^\s]+$/.test(valor)
        || /^\/uploads\/[a-f0-9-]+\.(jpg|png|webp|gif)$/.test(valor)
        || /^https?:\/\/[^\s]+$/.test(valor),
      message: 'La imagen debe ser una ruta válida o una URL http/https.',
    },
  },
  badge: { type: String, trim: true, maxlength: 40, default: '' },
  destacado: { type: Boolean, default: false },
}, {
  timestamps: true,
  toJSON: {
    transform(documento, objeto) {
      objeto.id = objeto._id.toString()
      delete objeto._id
      delete objeto.__v
      return objeto
    },
  },
})

export default mongoose.model('Recurso', recursoSchema)
