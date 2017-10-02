let MesaCRUD = artifacts.require("./MesaCRUD.sol")

let getId = (idTx) => {
  // console.log(idTx.logs[0].args)
  return idTx.logs[0].args.mesaId.toNumber()
}

contract('MesaCRUD', function(accounts) {

  let fromObject = {from : accounts[0]}

  it("create an MesaCRUD contract should create this contract with 0 mesas.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let mesas = await mesaCRUDInstance.getMesas.call(fromObject)
    assert.equal(0, mesas.length, "There are 0 mesas")
  })

  it("create an Mesa Contract should add a new mesa into MesaCRUD.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let tx = await mesaCRUDInstance.createMesa([], 1, fromObject)
    let exists = await mesaCRUDInstance.existsMesa.call(getId(tx))
    assert.ok(exists, "Exists mesa")
    await mesaCRUDInstance.deleteMesa(getId(tx), fromObject)
  })

  it("get an existent Mesa should returns its id and address.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let tx = await mesaCRUDInstance.createMesa([], 1, fromObject)
    let mesa = await mesaCRUDInstance.getMesa.call(getId(tx), fromObject)
    assert.equal(mesa[0].toNumber(), getId(tx), "ids are equals")
    assert.ok(mesa[1] !== undefined, "has address")
    await mesaCRUDInstance.deleteMesa(getId(tx), fromObject)
  })

  it("delete an mesa by id decrease the length of mesas", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let txcreate = await mesaCRUDInstance.createMesa([], 1, fromObject)
    let exists = await mesaCRUDInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(exists, "Exists mesa created")
    let txdelete = await mesaCRUDInstance.deleteMesa(getId(txcreate), fromObject)
    let notexists = await mesaCRUDInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(!notexists, "Not exists mesa deleted")
    assert.equal(getId(txcreate), getId(txdelete), "ids are equals")
  })

})
