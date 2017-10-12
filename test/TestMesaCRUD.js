let MesaCRUD = artifacts.require("./MesaCRUD.sol")

let getId = (idTx) => {
  // console.log(idTx.logs[0].args)
  return idTx.logs[0].args.mesaId.toNumber()
}

//refactor mesa crud should add its address when is trying to create another mesa

contract('MesaCRUD', function(accounts) {

  let fromObject = {from : accounts[0]}

  it("create an MesaCRUD contract should create this contract with 0 mesas.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let mesas = await mesaCRUDInstance.getMesas.call(fromObject)
    assert.equal(0, mesas.length, "There are 0 mesas")
  })

  it("create an Mesa Contract should add a new mesa into MesaCRUD.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let tx = await mesaCRUDInstance.createMesa([], "", fromObject)
    let exists = await mesaCRUDInstance.existsMesa.call(getId(tx))
    assert.ok(exists, "Exists mesa")
    await mesaCRUDInstance.deleteMesa(getId(tx), fromObject)
  })

  it("get an existent Mesa should returns its address.", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let tx = await mesaCRUDInstance.createMesa([], "", fromObject)
    let mesa = await mesaCRUDInstance.getMesa.call(getId(tx), fromObject)
    let zero = "0x0000000000000000000000000000000000000000"
    assert.ok(mesa !== zero, "has address")
    await mesaCRUDInstance.deleteMesa(getId(tx), fromObject)
  })

  it("delete an mesa by id decrease the length of mesas", async () => {
    let mesaCRUDInstance = await MesaCRUD.deployed()
    let txcreate = await mesaCRUDInstance.createMesa([], "", fromObject)
    let exists = await mesaCRUDInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(exists, "Exists mesa created")
    let txdelete = await mesaCRUDInstance.deleteMesa(getId(txcreate), fromObject)
    let notexists = await mesaCRUDInstance.existsMesa.call(getId(txcreate), fromObject)
    assert.ok(!notexists, "Not exists mesa deleted")
    assert.equal(getId(txcreate), getId(txdelete), "ids are equals")
  })

})
