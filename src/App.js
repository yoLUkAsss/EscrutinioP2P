import React, { Component } from 'react'
import ElectionContract from '../build/contracts/Election.json'
import Election from './Election.js'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

//useful functions
//console.log(JSON.stringify(json, undefined, 2))
//this.state.web3.toAscii(x)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      depAddress: "",
      electionName: "",
      web3: null
    }
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

  instantiateContract(event) {
    event.preventDefault()
    const name = event.target.election.value
    const contract = require('truffle-contract')
    const election = contract(ElectionContract)
    var electionInstance
    election.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      election.deployed().then((instance) => {
        console.log(JSON.stringify(instance, undefined, 2))
        electionInstance = instance
        return electionInstance.setName(name, {from: accounts[0]})
      }).then((setResult) => {
        return electionInstance.getName.call(accounts[0])
      }).then((getResult) => {
        return this.setState({depAddress: electionInstance.address, electionName: getResult})
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">

          <div>
            <Election submitName={this.instantiateContract.bind(this)}/>
            <p>
              Address dep:<br/>
              {this.state.depAddress}
            </p>
          </div>


        </main>
      </div>
    );
  }
}

export default App
