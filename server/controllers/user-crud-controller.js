import { fromObject, userCRUD, user } from '../utils/web3-utils.js'
import {fromSolidity2String, bytes32ListToStringList} from '../utils/utils.js'

function userToJson(user){
  return {
          "address" : user[0],
          "email" : fromSolidity2String(user[1]),
          "category" : user[2].toNumber(),
          "distrito" : user[3].toNumber(),
          "escuela" : user[4].toNumber(),
          "mesa" : user[5].toNumber()
         }
}

export class UserCRUDController {


  /*    returns usersId : [int]   */
  getUsers(req, res){
    userCRUD.deployed()
    .then( async currentInstance => {
      let users = await currentInstance.getUsers.call(fromObject)
      res.status(200).json(users)
    })
    .catch ( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  /*    returns userAddress : string   */
  getUser(req, res){
    userCRUD.deployed()
    .then( async currentInstance => {
      let userAddress = await currentInstance.getUser.call(parseInt(req.params.userId), fromObject)
      res.status(200).json(userAddress)
    })
    .catch ( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  /*
    email : string,
    password : string
  */
  signup(req, res){
    userCRUD.deployed()
    .then( async (currentInstance) => {
      let signupVerify = await currentInstance.signupVerify.call(req.body.email, req.body.password, fromObject)
      if (signupVerify[0]) {
        res.status(400).json(fromSolidity2String(signupVerify[1]))
      } else {
        await currentInstance.signup.sendTransaction(req.body.email, req.body.password, fromObject)
        res.status(201).json(req.body.email)
      }
    })
    .catch( (error) => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }
  /*
    email : string,
    password : string
  */
  async login(req, res){
    userCRUD.deployed()
    .then( async (currentInstance) => {
      let userAddressVerify = await currentInstance.getUserByEmailVerify.call(req.body.email, fromObject)
      if (userAddressVerify[0]) {
        res.status(400).json(fromSolidity2String(userAddressVerify[1]))
      } else {
        let userAddress = await currentInstance.getUserByEmail.call(req.body.email, fromObject)
        let userInstance = await user.at(userAddress)
        let loginVerify = await userInstance.loginVerify.call(req.body.password, fromObject)
        if (loginVerify[0]) {
          res.status(400).json(fromSolidity2String(loginVerify[1]))
        } else {
          await userInstance.login.sendTransaction(req.body.password, fromObject)
          let loggedUser = await userInstance.getUser.call(fromObject)
          res.status(200).json(userToJson(loggedUser))
        }
      }
    })
    .catch( (error) => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }
  /*
    address : string
  */
  logout(req, res){
    if (req.body.address) {
      user.at(req.body.address)
      .then( async userInstance => {
        await userInstance.logout.sendTransaction(fromObject)
        res.status(200).json("Se ha cerrado la sesion correctamente")
      })
      .catch( error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
    } else {
      res.status(400).json("No hay sesion iniciada")
    }
  }
}
