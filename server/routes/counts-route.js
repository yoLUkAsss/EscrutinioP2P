import express from 'express'
import { CountsController } from '../controllers/counts-controller.js'
const router = express.Router()
const CountsCtrl = new CountsController()

router.route('/').get(CountsCtrl.getTotal)
// router.route('/:distritoId').get(CountsCtrl.getDistritoTotal)
// router.route('/:distritoId/:escuelaId').get(CountsCtrl.getEscuelaTotal)
// router.route('/:distritoId/:escuelaId/:mesaId').get(CountsCtrl.getMesaTotal)

export default router;
