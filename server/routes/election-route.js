import express from 'express'
import { ElectionController } from '../controllers/election-controller'

const router = express.Router()
const ElectionCtrl = new ElectionController()

router.route('/').get(ElectionCtrl.getHome)

router.route('/candidates').get(ElectionCtrl.getCandidates)
router.route('/initialized').get(ElectionCtrl.getInitializedElection)

router.route('/total').get(ElectionCtrl.getTotal)

router.route('/initelection').post(ElectionCtrl.initElection)

router.route('/setautoridadelectoral').post(ElectionCtrl.setAutoridadElectoral)
router.route('/setapoderadodepartido').post(ElectionCtrl.setApoderadoDePartido)
router.route('/setdelegadodedistrito').post(ElectionCtrl.setDelegadoDeDistrito)
router.route('/setdelegadodeescuela').post(ElectionCtrl.setDelegadoDeEscuela)
router.route('/setpresidentedemesa').post(ElectionCtrl.setPresidenteDeMesa)
router.route('/setvicepresidentedemesa').post(ElectionCtrl.setVicepresidenteDeMesa)
router.route('/setfiscal').post(ElectionCtrl.setFiscal)

export default router;
