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
    let tx = await escuelaInstance.createMesa([], "", fromObject)
    let exists = await escuelaInstance.existsMesa.call(getId(tx))
    assert.ok(exists, "Exists mesa")
    await escuelaInstance.deleteMesa(getId(tx), fromObject)
  })

  it("get an existent Mesa should returns its address.", async () => {
    let escuelaInstance = await Escuela.deployed()
    let tx = await escuelaInstance.createMesa([], "", fromObject)
    let mesa = await escuelaInstance.getMesa.call(getId(tx), fromObject)
    let zero = "0x0000000000000000000000000000000000000000"
    assert.ok(mesa !== zero, "has address")
    await escuelaInstance.deleteMesa(getId(tx), fromObject)
  })

  it("delete an mesa by id decrease the length of mesas", async () => {
    let escuelaInstance = await Escuela.deployed()
    let txcreate = await escuelaInstance.createMesa([], "", fromObject)
    let exists = await escuelaInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(exists, "Exists mesa created")
    let txdelete = await escuelaInstance.deleteMesa(getId(txcreate), fromObject)
    let notexists = await escuelaInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(!notexists, "Not exists mesa deleted")
    assert.equal(getId(txcreate), getId(txdelete), "ids are equals")
  })

})
