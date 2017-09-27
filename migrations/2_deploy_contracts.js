//var Contract = artifacts.require("./path/to/Contract.sol");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Election = artifacts.require("./Election.sol");
var UserCRUD = artifacts.require("./UserCRUD.sol");
var MesaCRUD = artifacts.require("./MesaCRUD.sol");
// var Mesa = artifacts.require("./Mesa.sol");
// var Mesa = artifacts.require("./Mesa.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);

  /**
   * Example of use :
   *
   * deployer.deploy(Contract);
   *
   */
   deployer.deploy(Election);
   deployer.deploy(UserCRUD);
   deployer.deploy(MesaCRUD);
  //  deployer.deploy(Mesa);
  //  deployer.deploy(Mesa);
};
