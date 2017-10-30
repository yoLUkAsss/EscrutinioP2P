import { fromObject, userCRUDInstance, user, web3 } from '../utils/web3-utils.js'

function userToJson(user){
  return {
          "address" : user[0],
          "email" : web3.toAscii(user[1]),
          "category" : user[2].toNumber(),
          "distrito" : user[3].toNumber(),
          "escuela" : user[4].toNumber(),
          "mesa" : user[5].toNumber()
         }
}

export class UserCRUDController {
  /*    returns usersId : [int]   */
  getUsers(req, res){
    try{
      userCRUDInstance.then((currentInstance) => {
        currentInstance.getUsers.call(fromObject).then((usersId) => {
          res.json(usersId)
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  /*    returns userAddress : string   */
  getUser(req, res){
    try{
      userCRUDInstance.then((currentInstance) => {
        currentInstance.getUser.call(req.params.userId, fromObject).then((userAddress) => {
          res.json(userAddress)
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  /*
    email : string,
    password : string,
    category ; int
  */
  createUser(req, res){
    try{
      userCRUDInstance.then((currentInstance) => {
        currentInstance.createUser.sendTransaction(req.body.email, req.body.password, req.body.category, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  /*
    email : string,
    password : string
  */
  async signup(req, res){
    userCRUDInstance
    .then( async (currentInstance) => {
      let signupVerify = await currentInstance.signupVerify.call(req.body.email, req.body.password, fromObject)
      if (signupVerify[0]) { throw new Error(web3.toAscii(signupVerify[1])) }
      await currentInstance.signup.sendTransaction(req.body.email, req.body.password, fromObject)
      res.status(201).json(req.body.email)
    })
    .catch( (error) => {
      res.status(400).json(error.message)
    })
  }
  /*
    email : string,
    password : string
  */
  async login(req, res){
    userCRUDInstance
    .then( async (currentInstance) => {
      let userAddressVerify = await currentInstance.getUserByEmailVerify.call(req.body.email, fromObject)
      if (userAddressVerify[0]) { throw new Error(web3.toAscii(userAddressVerify[1])) }
      let userAddress = await currentInstance.getUserByEmail.call(req.body.email, fromObject)
      let userInstance = await user.at(userAddress)
      let loginVerify = await userInstance.loginVerify.call(req.body.password, fromObject)
      if (loginVerify[0]) { throw new Error(web3.toAscii(loginVerify[1])) }
      await userInstance.login.sendTransaction(req.body.password, fromObject)
      let loggedUser = await userInstance.getUser.call(fromObject)
      res.status(200).json(userToJson(loggedUser))
    })
    .catch( (error) => {
      res.status(400).json(error.message)
    })
  }
  /*
    email : string
  */
  async logout(req, res){
    try {
      let userInstance = await user.at(req.address)
      await userInstance.logout.sendTransaction(fromObject)
      res.status(200)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
}
