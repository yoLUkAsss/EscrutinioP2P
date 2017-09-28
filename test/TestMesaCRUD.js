let MesaCRUD = artifacts.require("./MesaCRUD.sol")

contract('MesaCRUD', function(accounts) {

  it("create an MesaCRUD contract should create this contract with 0 mesas.", () => {
    return MesaCRUD.deployed().then( (instance) => {
      return instance.getMesas.call({from: accounts[0]})
    }).then( (mesas) => {
      assert.equal(mesas.length, 0, "There are 0 mesas.")
    })
  })

  it("create an Mesa Contract should add a new mesa into MesaCRUD.", () => {
    return MesaCRUD.deployed().then( (instance) => {
      mesaCRUDInstance = instance
      return mesaCRUDInstance.createMesa("jesus@gmail.com", [], [], 9, {from:accounts[0]})
    }).then( (idTx) => {
      return mesaCRUDInstance.existsMesa(1)
    }).then( (exists) => {
      assert.ok(exists, "Exists mesa with id 1")
    })
  })

  it("get an existent Mesa should returns its id and address.", () => {
    return MesaCRUD.deployed()
      .then( (instance) => {
      mesaCRUDInstance = instance
      return mesaCRUDInstance.createMesa("jesus@gmail.com", [], [], 1, {from:accounts[0]})
    }).then( (idTx) => {
      return mesaCRUDInstance.getMesa(1)
    }).then( (mesa) => {
      assert.equal(mesa[0], 1, "ids are equals")
      assert.ok(mesa[1] !== undefined, "has address")
    })
  })

  it("delete an mesa by id decrease the length of mesas", () => {
    return MesaCRUD.deployed()
    .then( (instance) => {
      mesaCRUDInstance = instance
      return mesaCRUDInstance.createMesa("jesus@gmail.com", [], [], 1, {from: accounts[0]})
    }).then( (idTx) => {
      return mesaCRUDInstance.getMesas()
    }).then( (mesas) => {
      expected = mesas.length-1
      return mesaCRUDInstance.deleteMesa(1)
    }).then( (idTx) => {
      return mesaCRUDInstance.getMesas()
    }).then( (mesas) => {
      assert.equal(expected, mesas.length , "they have same length")
      return mesaCRUDInstance.existsMesa(1)
    }).then( (exists) => {
      assert.ok(!exists, "that mesa doesnt exists anymore")
    })
  })

})
