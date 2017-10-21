let Escuela = artifacts.require("./Escuela.sol")

let getId = (idTx) => {
  // console.log(idTx.logs[0].args)
  return idTx.logs[0].args.mesaId.toNumber()
}

//refactor mesa crud should add its address when is trying to create another mesa

contract('Escuela', function(accounts) {

  let fromObject = {from : accounts[0]}

  it("create an Escuela contract should create this contract with 0 mesas.", async () => {
    let escuelaInstance = await Escuela.deployed()
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    assert.equal(0, mesas.length, "There are 0 mesas")
  })

  it("create an Mesa Contract should add a new mesa into Escuela.", async () => {
    let escuelaInstance = await Escuela.deployed()
    await escuelaInstance.createMesa([], fromObject)
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    let mesaId = mesas[mesas.length - 1].toNumber()
    let exists = await escuelaInstance.existsMesa.call(mesaId)
    assert.ok(exists, "Exists mesa")
    await escuelaInstance.deleteMesa(mesaId, fromObject)
  })

  it("get an existent Mesa should returns its address.", async () => {
    let escuelaInstance = await Escuela.deployed()
    await escuelaInstance.createMesa([], fromObject)
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    let mesaId = mesas[mesas.length - 1].toNumber()
    let mesa = await escuelaInstance.getMesa.call(mesaId, fromObject)
    let zero = "0x0000000000000000000000000000000000000000"
    assert.ok(mesa !== zero, "has address")
    await escuelaInstance.deleteMesa(mesaId, fromObject)
  })

  it("delete an mesa by id decrease the length of mesas", async () => {
    let escuelaInstance = await Escuela.deployed()
    await escuelaInstance.createMesa([], fromObject)
    let mesas = await escuelaInstance.getMesas.call(fromObject)
    let mesaId = mesas[mesas.length - 1].toNumber()
    let exists = await escuelaInstance.existsMesa.call(mesaId, fromObject)
    assert.ok(exists, "Exists mesa created")
    await escuelaInstance.deleteMesa(mesaId, fromObject)
    let notexists = await escuelaInstance.existsMesa.call(mesaId, fromObject)
    assert.ok(!notexists, "Not exists mesa deleted")
  })

})
