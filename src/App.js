import React, { Component } from 'react'
import ElectionContract from '../build/contracts/Election.json'
import MesaContract from '../build/contracts/Mesa.json'
import Election from './Election.js'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

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
    this.getName = this.getName.bind(this)
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
    // const election = contract(ElectionContract).at(this.state.depAddress)
    const election = contract(ElectionContract)
    // console.log(election)
    var electionInstance
    election.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((error, accounts) => {
      election.deployed().then((instance) => {
        electionInstance = instance
        // console.log(JSON.stringify(electionInstance, undefined, 2))
        return electionInstance.createNMesas.call([],[], 5, 5,{from: accounts[0]})
      }).then((mesas) => {
        console.log(mesas)
        return this.setState({addresses : mesas})
      })
    })
  }

  getName(event){
    event.preventDefault()
    const mesa = contract(MesaContract)

    mesa.setProvider(this.state.web3.currentProvider)
    console.log(mesa)
    const mesaInstance = mesa.at(this.state.addresses[2])
    console.log(mesaInstance)
    this.state.web3.eth.getAccounts((error, accounts) => {
      mesaInstance.getCandidates.call({from: accounts[0]}).then((candidates) => {
        console.log(candidates)
      })

      mesaInstance.getName.call({from: accounts[0]}).then((name) => {
        console.log(this.state.web3.toAscii(name))
        return
      })
    })

    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   mesa.deployed().then((instance) => {
    //     mesaInstance = instance
    //     return mesaInstance
    //   }
    // })

  }

  toLi(ls){
    // console.log(ls)
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
        <button type="button" onClick={this.getName}>
          Get Name
        </button>
      </div>
      </Center>
    );
  }
}

export default App
