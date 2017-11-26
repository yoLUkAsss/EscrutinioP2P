var Mesa = artifacts.require("./Mesa.sol");

contract('Mesa', function(accounts) {
  let fromObject = {from : accounts[0]}

  it("create a new Mesa with 2 candidates should create a Mesa with 2 candidates, and an empty address for crud.", async () => {
    let zero = "0x0000000000000000000000000000000000000000"
    let mesaInstance = await Mesa.new(['c1', 'c2'], 10, zero, fromObject)
    let candidates = await mesaInstance.getCandidatesList.call(fromObject)
    assert.equal(candidates.length, 2, "There are 2 candidates.")

    // await mesaInstance.destroy(accounts[0])
  })

  it("set fiscal should add 1 participant", async () => {
    let zero = "0x0000000000000000000000000000000000000000"
    let mesaInstance = await Mesa.new([], 10, zero, fromObject)
    let email = "jesus@gmail.com"
    await mesaInstance.setFiscal(email, fromObject)
    let isFiscal = await mesaInstance.isFiscal.call(email, fromObject)

    assert.ok(isFiscal, "fiscal added correctly")
    // await mesaInstance.destroy(accounts[0])
  })

  it("set presidente should add 1 participant and set presidente", async () => {
    let zero = "0x0000000000000000000000000000000000000000"
    let mesaInstance = await Mesa.new([], 10, zero, fromObject)
    let email = "jesus@gmail.com"
    await mesaInstance.setPresidenteDeMesa(email, fromObject)
    let isPresidenteDeMesa = await mesaInstance.isPresidenteDeMesa.call(email, fromObject)
    assert.ok(isPresidenteDeMesa, "presidente added correctly")

    // await mesaInstance.destroy(accounts[0])
  })

})
