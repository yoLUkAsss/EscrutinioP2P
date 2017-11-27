let Escuela = artifacts.require("./Escuela.sol")

let getId = (idTx) => {
  return idTx.logs[0].args.mesaId.toNumber()
}
contract('Escuela', function(accounts) {

  let fromObject = {from : accounts[0]}

  it("create an Escuela contract should create this contract with 0 mesas.", async () => {
    let escuelaInstance = await Escuela.deployed()
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    assert.equal(0, mesas.length, "There are 0 mesas")
  })

  it("create an Mesa Contract should add a new mesa into Escuela.", async () => {
    let escuelaInstance = await Escuela.deployed()
    let zero = "0x0000000000000000000000000000000000000000"
    await escuelaInstance.createMesa(1, zero, fromObject)
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    let mesaId = mesas[mesas.length - 1].toNumber()
    let exists = await escuelaInstance.existsMesa.call(mesaId)
    assert.ok(exists, "Exists mesa")
  })

  it("get an existent Mesa should returns its address.", async () => {
    let escuelaInstance = await Escuela.deployed()
    let zero = "0x0000000000000000000000000000000000000000"
    await escuelaInstance.createMesa(1, zero, fromObject)
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    let mesaId = mesas[mesas.length - 1].toNumber()
    let mesa = await escuelaInstance.getMesa.call(mesaId, fromObject)
    assert.ok(zero === zero, "has address")
  })
})
