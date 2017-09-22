// const Web3 = require('web3')
// const Web3Utils = require('web3-utils')
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// import getWeb3 from '../src/utils/getWeb3'
// let web3 = getWeb3.then(results => {
//   return results.web3
// })

let UserCRUD = artifacts.require("./UserCRUD.sol")

contract('UserCRUD', function(accounts) {

  it("create an UserCRUD contract should create this contract with 0 users.", () => {
    return UserCRUD.deployed().then( (instance) => {
      return instance.getUsers.call({from: accounts[0]})
    }).then( (users) => {
      assert.equal(users.length, 0, "There are 0 users.")
    })
  })

  it("create an User should add that user into UserCRUD.", () => {
    return UserCRUD.deployed().then( (instance) => {
      userCRUDInstance = instance
      return userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, {from:accounts[0]})
    }).then( (idTx) => {
      return userCRUDInstance.existsUser(0)
    }).then( (exists) => {
      assert.ok(exists, "Exists user with id 0")
    })
  })

  it("get an existent User should returns its id, mail, role id.", () => {
    return UserCRUD.deployed()
      .then( (instance) => {
      userCRUDInstance = instance
      return userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, {from:accounts[0]})
    }).then( (idTx) => {
      return userCRUDInstance.getUser(0)
    }).then( (user) => {
      //user[0] id
      //check email: user[1] email
      // assert.equal("jesus@gmail.com", web3.toUtf8(user[1]), "mails are equals")
      //check password: user[2] password
      // assert.equal("jesus", web3.toUtf8(user[2]), "passwords are equals")
      //check role: user[3] role(type int)
      let expectedRole = 1
      let currentRole = user[3].toNumber()
      assert.equal(expectedRole, currentRole, "categories are equals")
    })
  })

  it("update some fields of an existent User should update that User field", () => {
    return UserCRUD.deployed()
    .then( (instance) => {
      userCRUDInstance = instance
      return userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, {from: accounts[0]})
    }).then( (idTx) => {
      return userCRUDInstance.updateUser(0, "laime@gmail.com", "laime", 0, {from: accounts[0]})
    }).then( (idTx) => {
      return userCRUDInstance.getUser(0)
    }).then( (user) => {
      // assert.equal("laime@gmail.com", web3.toUtf8(user[1]), "mail was changed")
      // assert.equal("laime", web3.toUtf8(user[2]), "password was changed")
      assert.equal(0, user[3].toNumber(), "role was changed")
    })
  })

  it("delete an user by id decrease the quantity of users", () => {
    return UserCRUD.deployed()
    .then( (instance) => {
      userCRUDInstance = instance
      return userCRUDInstance.createUser("jesus@gmail.com", "jesus", 0, {from: accounts[0]})
    }).then( (idTx) => {
      return userCRUDInstance.getUsers()
    }).then( (users) => {
      expected = users.length
      return userCRUDInstance.deleteUser(0)
    }).then( (idTx) => {
      return userCRUDInstance.getUsers()
    }).then( (users) => {
      assert.equal(expected-1, users.length , "they have same length")
    })
  })

})
