import React, { Component } from 'react';
import ElectionContract from '../../build/contracts/Election.json'
import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import {Form, Header, Container} from 'semantic-ui-react'
import DinamicListForm from '../DinamicListForm.js'

import * as utils from '../utils/utils.js'

class CreateMesa2 extends Component {
    constructor() {
        super();
        this.state = {
          autoridadElectoral : {name : ''},
          candidatos : [{name: ''}],
          web3 : null,
        }
        this.handleCreateMesa = this.handleCreateMesa.bind(this)
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

    handleAutoridadElectoralName = (evt) => {
      this.setState({ autoridadElectoral: {name : evt.target.value} })
    }

    handleCreateMesa(event){
      event.preventDefault()
      const election = contract(ElectionContract)
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      let mesaCRUDInstance
      let csFiltered = utils.filterNoBlanks(utils.getNames(this.state.candidatos))
      election.setProvider(this.state.web3.currentProvider)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((electionInstance) => {
          console.log("befor get mesa crud address")
          console.log(electionInstance)
          return electionInstance.getMesaCRUDaddress.call(this.state.autoridadElectoral.name, {from:accounts[0]})
        }).then((address) => {
          console.log("get address of mesa election crud")
          console.log(address)
          return mesaElectionCRUD.at(address)
        }).then((mesaCRUDIns) => {
          console.log("loaded instance of mesa election crud")
          mesaCRUDInstance = mesaCRUDIns
          return mesaCRUDInstance.createMesa.estimateGas(csFiltered, {from:accounts[0]})
        }).then((gasEstimated) =>{
          console.log("sent estimate gas")
          return mesaCRUDInstance.createMesa.sendTransaction(csFiltered, {from:accounts[0], gas: gasEstimated})
        }).then((tx)=>{
          console.log("create mesa transaction finished")
        }).catch((reason) => {
          console.log("cached some error")
          console.log(reason)
        })
      })
    }
    //manejo de lista de  candidato
    handleAddCandidato = () => {
      this.setState({ candidatos: this.state.candidatos.concat([{ name: '' }]) })
    }

    handleUpdateCandidato = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, name: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }

    handleRemoveCandidato = (idx) => () => {
      this.setState({ candidatos: this.state.candidatos.filter((s, sidx) => idx !== sidx) })
    }

    render () {
        return (
          <Container>
            <Form>
              <Header as='h1'>Crear Mesa</Header>
                <Form.Input focus
                type='text'
                label='Nombre de la Autoridad Electoral'
                placeholder='Nombre de la Autoridad Electoral'
                value={this.state.autoridadElectoral.name}
                onChange={this.handleAutoridadElectoralName}/>
                <DinamicListForm
                title='Candidatos'
                type='text'
                placeholder='Nombre de Candidato'
                items={this.state.candidatos}
                onAdd={this.handleAddCandidato}
                onDelete={this.handleRemoveCandidato}
                onUpdate={this.handleUpdateCandidato}/>
                <Form.Button onClick={this.handleCreateMesa}>Crear Mesa</Form.Button>
            </Form>
          </Container>
        );
    }
}

export default CreateMesa2
