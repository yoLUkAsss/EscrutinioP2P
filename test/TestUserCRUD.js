let UserCRUD = artifacts.require("./UserCRUD.sol")

let cleanDB = (userDB, fromObj) => {
  userDB.getUsers.call(fromObj).then((users) => {
    users.forEach((id) => {
      userDB.deleteUser(id.toNumber(), fromObj)
    })
  })
}

let getId = (idTx) => {
  return idTx.logs[0].args.userId.toNumber()
}

contract('UserCRUD' ,function(accounts) {
  let fromObject = {from : accounts[0]}

  it("create an UserCRUD contract should create this contract with 0 users", async () => {
    let userCRUDInstance = await UserCRUD.deployed()
    let users = await userCRUDInstance.getUsers.call(fromObject)
    assert.equal(users.length, 0, "There are 0 users")
  })

  it("create an User should add that user into UserCRUD", async () => {
    let userCRUDInstance = await UserCRUD.deployed()
    let tx = await userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, fromObject)
    let exists = await userCRUDInstance.existsUser.call(getId(tx), fromObject)
    assert.ok(exists, "Exists user by id")
    await userCRUDInstance.deleteUser(getId(tx), fromObject)
  })

  it("get an existent User should returns its address", async () => {
    let userCRUDInstance = await UserCRUD.deployed()
    let tx = await userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, fromObject)
    let userAddress = await userCRUDInstance.getUser.call(getId(tx), fromObject)
    let zero = "0x0000000000000000000000000000000000000000"
    assert.ok(userAddress != zero, "address is not zero")
    await userCRUDInstance.deleteUser(getId(tx), fromObject)
    // assert.equal("jesus@gmail.com", web3.toUtf8(user[1]), "mails are equals")
    // assert.equal("jesus", web3.toUtf8(user[2]), "passwords are equals")
  })

  it("delete an user by id decrease the quantity of users", async () => {
    let userCRUDInstance = await UserCRUD.deployed()
    let txcreate = await userCRUDInstance.createUser("jesus@gmail.com", "jesus", 1, fromObject)
    let existsPostCreate = await userCRUDInstance.existsUser.call(getId(txcreate), fromObject)
    assert.ok(existsPostCreate, "user created correctly")
    let txdelete = await userCRUDInstance.deleteUser(getId(txcreate), fromObject)
    assert.equal(getId(txcreate), getId(txdelete), "ids from user created and deleted are equals")
    let existsPostDelete = await userCRUDInstance.existsUser.call(getId(txdelete), fromObject)
    assert.ok(!existsPostDelete, "user deleted correctly")
  })

})
