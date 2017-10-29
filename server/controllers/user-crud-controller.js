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
  signup(req, res){
    try{
      userCRUDInstance.then((currentInstance) => {
        currentInstance.signup.sendTransaction(req.body.email, req.body.password, fromObject).then((idTx) => {
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
  async login(req, res){
    try{
      userCRUDInstance.then((currentInstance) => {
        currentInstance.getUserByEmail.call(req.body.email, fromObject).then((userAddress) => {
        user.at(userAddress).then(async (userInstance) => {
          await userInstance.login.sendTransaction(req.body.password, fromObject)
          userInstance.getUser.call(fromObject).then((loggedUser) => {
            res.json(userToJson(loggedUser))
            }).catch(err => {
              res.json("failed")
            })
          })
        }).catch(err => {
          res.json("failed")
        })
      })
    } catch(err){
      res.json("failed")
    }
  }
  /*
    email : string
  */
  logout(req, res){
    try{
      user.at(req.address).then(userInstance => {
        userInstance.logout.sendTransaction(fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }

}
