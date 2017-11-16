import express from 'express'
import { LocationController } from '../controllers/location-crud-controller'

const router = express.Router()
const LocationCtrl = new LocationController()

router.route('/').get(LocationCtrl.getDistritos)
router.route('/:distritoId').get(LocationCtrl.getDistrito)

router.route('/:distritoId/:escuelaId/:mesaId').get(LocationCtrl.getMesaTotal)
router.route('/:distritoId/:escuelaId').get(LocationCtrl.getEscuelaTotal)
router.route('/totaldistrito').post(LocationCtrl.totalDistrito)
router.route('/:distritoId/:escuelaId/:mesaId/user').get(LocationCtrl.getMesaUser)
router.route('/:distritoId/:escuelaId/:mesaId/participants').get(LocationCtrl.getMesaParticipants)

router.route('/:distritoId/:escuelaId/:mesaId/checkmesa').post(LocationCtrl.checkMesa)
router.route('/:distritoId/:escuelaId/:mesaId/loadmesa').post(LocationCtrl.loadMesa)

// router.route('/:distritoId/exists').get(LocationCtrl.existsDistrito)
// router.route('/:distritoId/:escuelaId/exists').get(LocationCtrl.existsEscuela)
// router.route('/:distritoId/:escuelaId/:mesaId/exists').get(LocationCtrl.existsMesa)

export default router;
