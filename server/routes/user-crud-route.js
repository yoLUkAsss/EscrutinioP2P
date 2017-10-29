import express from 'express'
import { UserCRUDController } from '../controllers/user-crud-controller.js'

const router = express.Router()
const UserCRUDCtrl = new UserCRUDController()

router.route('/').get(UserCRUDCtrl.getUsers)
router.route('/:userId').get(UserCRUDCtrl.getUser)
router.route('/').post(UserCRUDCtrl.createUser)

router.route('/signup').post(UserCRUDCtrl.signup)
router.route('/login').post(UserCRUDCtrl.login)
router.route('/logout').post(UserCRUDCtrl.login)

export default router;
