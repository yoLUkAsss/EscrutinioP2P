let Election = artifacts.require("./Election.sol")

/*
async function assertThrowsAsynchronously(test, error) {
    try {
        await test();
    } catch(e) {
        if (!error || e instanceof error)
            return "everything is fine";
    }
    throw new AssertionError("Missing rejection" + (error ? " with "+error.name : ""));
}
*/

contract('Election', function(accounts) {
  let fromObject = { from : accounts[0]}

  it('a new election should have an usercrudaddress and a mesacrudaddress', async () => {
    let electionInstance = await Election.deployed()
    let userCRUDAddress = await electionInstance.getUserCRUDAddress.call(fromObject)
    let mesaCRUDAddress = await electionInstance.getMesaCRUDAddress.call(fromObject)
    let zeroAddress = "0x0000000000000000000000000000000000000000"
    assert.ok(userCRUDAddress !== zeroAddress , "user crud initialized")
    assert.ok(mesaCRUDAddress !== zeroAddress , "mesa crud initialized")
  })


  it('new election with j@gmail as creator should create an AutoridadElectoral with j@gmail as email', async () => {
    let electionInstance = await Election.deployed()
    let creator = "j@gmail"
    let mesas = 1
    let partidos = ["empty"]
    let personaPorMesa = 10
    await electionInstance.createElection(creator, mesas, partidos, personaPorMesa, fromObject)
    let isAutoridad = await electionInstance.isAutoridadElectoral.call(creator, fromObject)
    assert.ok(isAutoridad, "exist autoridad electoral")
  })

  it('create another election should throw an exception', async () => {
    let electionInstance = await Election.deployed()
    let creator = "j@gmail"
    let mesas = 1
    let partidos = ["empty"]
    let personaPorMesa = 10
    try{
      await electionInstance.createElection(creator, mesas, partidos, personaPorMesa, fromObject)
    } catch(err){
      assert.ok(true, "exception catched")
    }
  })

})
