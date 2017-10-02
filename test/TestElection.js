let Election = artifacts.require("./Election.sol")

contract('Election', function(accounts) {
  let fromObject = { from : accounts[0]}

  it('new election with j@gmail as creator should create an AutoridadElectoral with j@gmail as email', async () => {
    let electionInstance = await Election.deployed()
    let creator = "j@gmail"
    let mesas = 0
    let partidos = ["empty"]
    let personaPorMesa = 10
    let tx = await electionInstance.createElection(creator, mesas, partidos, personaPorMesa, fromObject)
    let isAutoridad = await electionInstance.isAutoridadElectoral.call(creator, fromObject)
    assert.ok(isAutoridad, "exist autoridad electoral")
  })
})
