import express from 'express'
import { ElectionController } from '../controllers/election-controller'
const multer  = require('multer')
const upload = multer()

const router = express.Router()
const ElectionCtrl = new ElectionController()

// router.route('/').get(ElectionCtrl.getHome)

router.route('/candidates').get(ElectionCtrl.getCandidates)
// router.route('/candidate').get(ElectionCtrl.getCandidate)
router.route('/info').get(ElectionCtrl.getElectionInfo)
router.route('/initbycsv').post(upload.single("file"), ElectionCtrl.initByCSV)
router.route('/total').get(ElectionCtrl.getTotal)

router.route('/setautoridadelectoral').post(ElectionCtrl.setAutoridadElectoral)
router.route('/setapoderadodepartido').post(ElectionCtrl.setApoderadoDePartido)
router.route('/setdelegadodedistrito').post(ElectionCtrl.setDelegadoDeDistrito)
router.route('/setdelegadodeescuela').post(ElectionCtrl.setDelegadoDeEscuela)
router.route('/setpresidentedemesa').post(ElectionCtrl.setPresidenteDeMesa)
router.route('/setvicepresidentedemesa').post(ElectionCtrl.setVicepresidenteDeMesa)
router.route('/setfiscal').post(ElectionCtrl.setFiscal)

export default router;
