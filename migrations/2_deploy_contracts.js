//var Contract = artifacts.require("./path/to/Contract.sol");
let UserCRUD = artifacts.require("./UserCRUD.sol")
let UserElectionCRUD = artifacts.require("./UserElectionCRUD.sol")
let Escuela = artifacts.require("./Escuela.sol")
let Election = artifacts.require("./Election.sol")
let DistritoCRUD = artifacts.require("./DistritoCRUD.sol")
let Distrito = artifacts.require("./Distrito.sol")
let Counts = artifacts.require("./Counts.sol")
let Mesa = artifacts.require("./Mesa.sol")

/**
 * Example of use :
 *
 * deployer.deploy(Contract);
 *
 */
module.exports = (deployer) => {
  deployer.deploy([UserCRUD, Distrito, Escuela])
  deployer.deploy(UserElectionCRUD).then( () => {
    return deployer.deploy(Counts)
  }).then( () => {
    return deployer.deploy(DistritoCRUD)
  }).then( () => {
    return deployer.deploy(Election, UserElectionCRUD.address, DistritoCRUD.address, Counts.address)
  })
}
