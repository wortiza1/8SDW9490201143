import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'

const destino = new URL('../.env', import.meta.url)
if (existsSync(destino)) {
  console.log('backend/.env ya existe; no se modificó.')
} else {
  const ejemplo = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
  writeFileSync(destino, ejemplo.replace('JWT_SECRET=', 'JWT_SECRET=' + randomBytes(32).toString('hex')))
  console.log('backend/.env creado. Completa MONGODB_URI y los datos del administrador localmente.')
}
