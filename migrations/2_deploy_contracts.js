//var Contract = artifacts.require("./path/to/Contract.sol");
let SimpleStorage = artifacts.require("./SimpleStorage.sol")
let UserCRUD = artifacts.require("./UserCRUD.sol")
let UserElectionCRUD = artifacts.require("./UserElectionCRUD.sol")
let MesaCRUD = artifacts.require("./MesaCRUD.sol")
let MesaElectionCRUD = artifacts.require("./MesaElectionCRUD.sol")
let Election = artifacts.require("./Election.sol")

/**
 * Example of use :
 *
 * deployer.deploy(Contract);
 *
 */
module.exports = (deployer) => {
  deployer.deploy(SimpleStorage)
  deployer.deploy([UserCRUD, MesaCRUD])
  deployer.deploy(UserElectionCRUD).then( () => {
    return deployer.deploy(MesaElectionCRUD)
  }).then( () => {
    return deployer.deploy(Election, UserElectionCRUD.address, MesaElectionCRUD.address)
  })
  // deployer.deploy(UserCRUD);
  // deployer.deploy(UserElectionCRUD);
  // deployer.deploy(MesaCRUD);
  // deployer.deploy(Election);
}
