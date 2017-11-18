import express from 'express'
import electionRoutes from './election-route.js'
import userCRUDRoutes from './user-crud-route.js'
import locationCRUDRoutes from './location-crud-route.js'
import countsRoutes from './counts-route.js'

const router = express.Router()

/** GET /check-api - Check API */
router.get('/check-api', (req, res) =>
  res.send("It's working...")
)

// mount election routes at /election
router.use('/election', electionRoutes)
router.use('/users', userCRUDRoutes)
router.use('/locations', locationCRUDRoutes)
router.use('/counts', countsRoutes)

export default router
