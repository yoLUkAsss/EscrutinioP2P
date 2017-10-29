import express from 'express'
import { LocationController } from '../controllers/location-crud-controller'

const router = express.Router()
const LocationCtrl = new LocationController()

router.route('/').get(LocationCtrl.getLocations)
router.route('/:locationId').get(LocationCtrl.getLocation)
router.route('/').post(LocationCtrl.createLocation)

export default router;
