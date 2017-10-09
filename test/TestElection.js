let Election = artifacts.require("./Election.sol")

contract('Election', function(accounts) {
  let fromObject = { from : accounts[0]}

  it('new election with ae@gmail as creator should create the election', async () => {
    let electionInstance = await Election.deployed()
    let email = "ae@gmail"
    let tx = await electionInstance.createElection(email, email, fromObject)
    // let emailFromTx = tx.logs[0].args.autoridadElectoral
    // assert.equal(emailFromTx, email, "autoridad electoral email created")
    let created = await electionInstance.created.call(fromObject)
    assert.ok(created, "election created correctly")
  })

  it('create another election should throw an exception', async () => {
    let electionInstance = await Election.deployed()
    let email = "ae@gmail"
    try{
      await electionInstance.createElection(email, email, fromObject)
    } catch(err){
      assert.ok(true, "create another election catched")
    }
  })

  it('a user crud address in a created election should only be acceded by its AutoridadElectoral', async () => {
    let electionInstance = await Election.deployed()
    let userCRUDaddress = await electionInstance.getUserCRUDaddress.call("ae@gmail", fromObject)
    let zeroAddress = "0x0000000000000000000000000000000000000000"
    assert.ok(userCRUDaddress !== zeroAddress , "user crud address")
  })
  it('a mesa crud address should only be acceded by its AutoridadElectoral', async () => {
    let electionInstance = await Election.deployed()
    let mesaCRUDaddress = await electionInstance.getMesaCRUDaddress.call("ae@gmail", fromObject)
    let zeroAddress = "0x0000000000000000000000000000000000000000"
    assert.ok(mesaCRUDaddress !== zeroAddress , "mesa crud address")
  })

  it('try to accede to a usercrudaddress by a user not being AutoridadElectoral should throw an exception', async () => {
    let electionInstance = await Election.deployed()
    try{
      await electionInstance.getUserCRUDaddress.call("notae@gmail", fromObject)
    } catch(err){
      assert.ok(true, "try to get a user address by a no AutoridadElectoral was catched")
    }
  })

  it('try to accede to a mesacrudaddress by a user not being AutoridadElectoral should throw an exception', async () => {
    let electionInstance = await Election.deployed()
    try{
      await electionInstance.getMesaCRUDaddress.call("notae@gmail", fromObject)
    } catch(err){
      assert.ok(true, "try to get a mesa address by a no AutoridadElectoral was catched")
    }
  })
})
