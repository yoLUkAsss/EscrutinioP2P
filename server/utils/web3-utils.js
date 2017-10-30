// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import config from '../config.js'

// Import our contract artifacts and turn them into usable abstractions.
// const electionContract = require('../build/contracts/election.json')
import electionContract from '../../build/contracts/Election.json'
// const distritoCRUDContract = require('../build/contracts/distritoCRUD.json')
import distritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
//const distritoContract = require('../build/contracts/distrito.json')
import distritoContract from '../../build/contracts/Distrito.json'
// const escuelaContract = require('../build/contracts/escuela.json')
import escuelaContract from '../../build/contracts/Escuela.json'
//const mesaContract = require('../build/contracts/mesa.json')
import mesaContract from '../../build/contracts/Mesa.json'
//const userElectionCRUDContract = require('../build/contracts/userElectionCRUD.json')
import userElectionCRUDContract from '../../build/contracts/UserElectionCRUD.json'

import userContract from '../../build/contracts/User.json'

// Import contract address
const election = contract(electionContract)
const distritoCRUD = contract(distritoCRUDContract)
const userCRUD = contract(userElectionCRUDContract)
const user = contract(userContract)
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
let web3
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain_url))
}
election.setProvider(web3.currentProvider)
distritoCRUD.setProvider(web3.currentProvider)
userCRUD.setProvider(web3.currentProvider)
user.setProvider(web3.currentProvider)
let electionInstance = election.deployed()
let distritoCRUDInstance = distritoCRUD.deployed()
let userCRUDInstance = userCRUD.deployed()
let fromObject
web3.eth.getAccounts((err, accs) => {
  fromObject = { from : accs[0], gas : 3000000}
})

export { fromObject, electionInstance, distritoCRUDInstance, userCRUDInstance, user, web3 }
