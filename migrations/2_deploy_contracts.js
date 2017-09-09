//var Contract = artifacts.require("./path/to/Contract.sol");
var Election = artifacts.require("./Election.sol");
module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);

  /**
   * Example of use :
   *
   * deployer.deploy(Contract);
   *
   */
   deployer.deploy(Election);

};
