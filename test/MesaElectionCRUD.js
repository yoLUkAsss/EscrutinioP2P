let MesaElectionCRUD = artifacts.require("./MesaElectionCRUD.sol")

contract('MesaElectionCRUD', function(accounts) {

  it("create an MesaElectionCRUD contract should create this with 0 mesas.", () => {
    return MesaElectionCRUD.deployed().then( (instance) => {
      return instance.getMesas.call({from: accounts[0]})
    }).then( (mesas) => {
      assert.equal(mesas.length, 0, "There are 0 mesas.")
    })
  })

})
