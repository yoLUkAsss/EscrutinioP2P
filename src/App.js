import React, { Component } from 'react'
import ElectionContract from '../build/contracts/Election.json'
import Election from './Election.js'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import Center from 'react-center'

//useful functions
//console.log(JSON.stringify(json, undefined, 2))
//this.state.web3.toAscii(x)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      depAddress: "",
      electionName: "",
      web3: null,
      addresses: []
    }
    this.instantiateMesa = this.instantiateMesa.bind(this)
  }
  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  //inicializa el factory del contrato election
  instantiateContract(event) {
    event.preventDefault()
    const name = event.target.election.value
    const contract = require('truffle-contract')
    const election = contract(ElectionContract)
    var electionInstance
    election.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      election.deployed().then((instance) => {
        // console.log(JSON.stringify(instance, undefined, 2))
        electionInstance = instance
        return electionInstance.setName(name, {from: accounts[0]})
      }).then((setResult) => {
        return electionInstance.getName.call(accounts[0])
      }).then((getResult) => {
        return this.setState({depAddress: electionInstance.address, electionName: getResult})
      })
    })
  }

  //crea una mesa utilizando el factory election
  instantiateMesa(event) {
    event.preventDefault()
    // const mesa = event.target.election.value
    const contract = require('truffle-contract')
    // const election = contract(ElectionContract).at(this.state.depAddress)
    const election = contract(ElectionContract)
    // console.log(election)
    var electionInstance
    election.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      election.deployed().then((instance) => {
        electionInstance = instance
        // console.log(JSON.stringify(electionInstance, undefined, 2))
        return electionInstance.createMesa.call([],[], 5, {from: accounts[0]})
      }).then((addrs) => {
        return this.setState({addresses : this.state.addresses.concat(addrs)})
      })
    })
  }

  toLi(ls){
    console.log(ls)
    return (<ul>
    {
      ls.map(x => {
        return (<li>{x}</li>)
      }
    )}
    </ul>)
  }

  render() {
    return (
      <Center>      
      <div>
        <Election submitName={this.instantiateContract.bind(this)}/>
        <p>
          Address dep:<br/>
          {this.state.depAddress}
        </p>
        <button type="button" onClick={this.instantiateMesa}>
          Create Mesa
        </button>
        {this.toLi(this.state.addresses)}
      </div>
      </Center>
    );
  }
}

export default App
