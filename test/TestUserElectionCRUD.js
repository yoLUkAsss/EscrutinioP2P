let UserElectionCRUD = artifacts.require("./UserElectionCRUD.sol")

contract('UserElectionCRUD', function(accounts) {
  let fromObject = {from : accounts[0]}
  it("create an UserElectionCRUD contract should create this contract with 0 users.", async () => {
    let userElectionInstance = await UserElectionCRUD.deployed()
    let users = await userElectionInstance.getUsers.call(fromObject)
    assert.equal(users.length, 0, "There are 0 users.")
  })

  it("create an AutoridadElectoral user should add that user.", async () => {
    let userElectionInstance = await UserElectionCRUD.deployed()
    let email = "jesus@gmail.com"
    let pass = "jesus"
    await userElectionInstance.createAutoridadElectoral(email, pass, fromObject)
    let existsId = await userElectionInstance.emailMap.call(email, fromObject)
    let existsAutoridad = await userElectionInstance.existsUserByEmail(email, fromObject)
    assert.ok(existsAutoridad, "AutoridadElectoral created correctly.")
    await userElectionInstance.deleteUserByEmail(email, fromObject)
    let notExists = await userElectionInstance.existsUserByEmail(email, fromObject)
    assert.ok(!notExists, "deleted correctly")
  })
})
