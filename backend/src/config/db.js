import mongoose from 'mongoose'

// Conservamos la espera predeterminada de Mongoose para preparar los modelos
// cuando MongoDB ya está conectado. Express arranca después de conectar.

export async function conectarDB() {
  // Una conexión compartida por todos los modelos mientras vive el servidor.
  mongoose.connection.on('error', () => console.error('Error de conexión con MongoDB.'))
  mongoose.connection.on('disconnected', () => console.warn('MongoDB desconectado.'))
  console.log('Conectando con MongoDB...')
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 10000,
  })
  console.log('MongoDB conectado.')
}
