import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import { register, login, perfil } from '../controllers/authController.js'
import { autenticar } from '../middleware/auth.js'

const router = Router()
const limite = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false,
  message: { mensaje: 'Demasiados intentos. Espera unos minutos.' },
})
router.post('/register', limite, register)
router.post('/login', limite, login)
router.get('/me', autenticar, perfil)
export default router
