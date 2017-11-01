import express from 'express'
import { LocationController } from '../controllers/location-crud-controller'

const router = express.Router()
const LocationCtrl = new LocationController()

router.route('/').get(LocationCtrl.getLocations)
router.route('/:locationId').get(LocationCtrl.getLocation)

router.route('/initdistrito').post(LocationCtrl.initDistrito)
router.route('/initescuela').post(LocationCtrl.initEscuela)

export default router;
