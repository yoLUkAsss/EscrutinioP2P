import express from 'express'
import { LocationController } from '../controllers/location-crud-controller'

const router = express.Router()
const LocationCtrl = new LocationController()

router.route('/').get(LocationCtrl.getLocations)
router.route('/:locationId').get(LocationCtrl.getLocation)

router.route('/initdistrito').post(LocationCtrl.initDistrito)
router.route('/initescuela').post(LocationCtrl.initEscuela)

router.route('/:distritoId/:escuelaId/:mesaId').get(LocationCtrl.getMesaTotal)
router.route('/:distritoId/:escuelaId/:mesaId').post(LocationCtrl.getMesaUser)
// router.route('/:distritoId/:escuelaId/:mesaId/isvalidparticipant').post(LocationCtrl.isValidParticipant)
router.route('/:distritoId/:escuelaId/:mesaId/checkmesa').post(LocationCtrl.checkMesa)
router.route('/:distritoId/:escuelaId/:mesaId/loadmesa').post(LocationCtrl.loadMesa)

router.route('/:distritoId/:escuelaId/:mesaId/completemesa').post(LocationCtrl.completeMesa)

// router.route('/:distritoId/exists').get(LocationCtrl.existsDistrito)
// router.route('/:distritoId/:escuelaId/exists').get(LocationCtrl.existsEscuela)
// router.route('/:distritoId/:escuelaId/:mesaId/exists').get(LocationCtrl.existsMesa)

export default router;
