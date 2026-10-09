import { Router } from 'express'
import mongoose from 'mongoose'
import { listar, detalle, crear, actualizar, eliminar } from '../controllers/recursoController.js'
import { autenticar, soloAdmin } from '../middleware/auth.js'

const router = Router()
router.param('id', (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ mensaje: 'Identificador de producto inválido.' })
  next()
})
router.get('/', listar)
router.get('/:id', detalle)
router.post('/', autenticar, soloAdmin, crear)
router.put('/:id', autenticar, soloAdmin, actualizar)
router.delete('/:id', autenticar, soloAdmin, eliminar)
export default router
