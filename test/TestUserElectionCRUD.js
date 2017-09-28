// const Web3 = require('web3')
// const Web3Utils = require('web3-utils')
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// import getWeb3 from '../src/utils/getWeb3'
// let web3 = getWeb3.then(results => {
//   return results.web3
// })

let UserElectionCRUD = artifacts.require("./UserElectionCRUD.sol")

contract('UserElectionCRUD', function(accounts) {

  it("create an UserElectionCRUD contract should create this contract with 0 users.", () => {
    return UserElectionCRUD.deployed().then( (instance) => {
      return instance.getUsers.call({from: accounts[0]})
    }).then( (users) => {
      assert.equal(users.length, 0, "There are 0 users.")
    })
  })
  
})
