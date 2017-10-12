let MesaElectionCRUD = artifacts.require("./MesaElectionCRUD.sol")

let getId = (idTx) => {
  // console.log(idTx.logs[0].args)
  return idTx.logs[0].args.mesaId.toNumber()
}

contract('MesaElectionCRUD', function(accounts) {
  let fromObject = {from: accounts[0]}

  it("create an MesaElectionCRUD contract should create this with 0 mesas.", async () => {
    let mesaElectionCRUDInstance = await MesaElectionCRUD.deployed()
    let mesas = await mesaElectionCRUDInstance.getMesas.call(fromObject)
    assert.equal(mesas.length, 0, "There are 0 mesas.")
  })

  it("set PresidenteDeMesa to a mesa should be logged", async () => {
    let mesaElectionCRUDInstance = await MesaElectionCRUD.deployed()
    let tx = await mesaElectionCRUDInstance.createMesa([], "", fromObject)
    let exists = await mesaElectionCRUDInstance.existsMesa.call(getId(tx), fromObject)
    assert.ok(exists, "Exists mesa")

    let txSet = await mesaElectionCRUDInstance.setPresidenteDeMesa(getId(tx), "jesus", fromObject)
    assert.equal(getId(txSet), getId(tx), "mesas ids are equals")
    await mesaElectionCRUDInstance.deleteMesa(getId(tx), fromObject)
  })

})
