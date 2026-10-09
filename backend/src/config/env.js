import dotenv from 'dotenv'
dotenv.config({ path: new URL('../../.env', import.meta.url), quiet: true })

export function validarEntorno() {
  if (!process.env.MONGODB_URI) throw new Error('Configura MONGODB_URI en backend/.env.')
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres. Ejecuta npm run configurar.')
  }
}
