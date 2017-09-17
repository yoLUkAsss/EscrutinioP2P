var Mesa = artifacts.require("./Mesa.sol");

contract('Mesa', function(accounts) {

  it("...should create a mesa with 1 apoderado, 2 fiscales and 3 candidates.", function() {
    return Mesa.new('apoderado', ['f1', 'f2'], [], 0, {from:accounts[0]}).then(function(instance) {
      mesaInstance = instance;

      return mesaInstance.getCandidates({from: accounts[0]});
    }).then(function(candidates) {
      assert.equal(candidates.length, 3, "There are 3 candidates.");
    });
  });
});
