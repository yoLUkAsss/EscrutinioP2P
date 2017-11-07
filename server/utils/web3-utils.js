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
//const user = require('../build/contracts/user.json')
import userContract from '../../build/contracts/User.json'
//const user = require('../build/contracts/user.json')
import countsContract from '../../build/contracts/Counts.json'


// Import contract address
const election = contract(electionContract)
const distritoCRUD = contract(distritoCRUDContract)
const userCRUD = contract(userElectionCRUDContract)
const user = contract(userContract)
const distrito = contract(distritoContract)
const escuela = contract(escuelaContract)
const mesa = contract(mesaContract)
const counts = contract(countsContract)
// const escuela = contract(escuelaContract)
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
distrito.setProvider(web3.currentProvider)
escuela.setProvider(web3.currentProvider)
mesa.setProvider(web3.currentProvider)
counts.setProvider(web3.currentProvider)
// escuela.setProvider(web3.currentProvider)
// let electionInstance = election.deployed()
// let distritoCRUDInstance = distritoCRUD.deployed()
// let userCRUDInstance = userCRUD.deployed()
let fromObject
web3.eth.getAccounts((err, accs) => {
  fromObject = { from : accs[0], gas : 3000000}
})

export { fromObject, election, distritoCRUD, userCRUD, user, distrito, escuela, mesa, web3 , counts}
