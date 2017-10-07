import React, { Component } from 'react';

import ElectionContract from '../../build/contracts/Election.json'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import {Form, Header, Container, Button} from 'semantic-ui-react'
import DinamicListForm from '../DinamicListForm.js'

import * as utils from '../utils/utils.js'

class CreateMesa2 extends Component {
    constructor() {
        super();
        this.state = {
          autoridadElectoral : '',
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

    handleAutoridadElectoral = (evt) => {
      this.setState({ autoridadElectoral : evt.target.value })
    }

    handleCreateMesa(event){
      event.preventDefault()
      let electionInstance
      let csFiltered = utils.filterNoBlanks(utils.getNames(this.state.candidatos))
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.createMesa.sendTransaction(this.state.autoridadElectoral, csFiltered,
            {from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          console.log("tx sent")
        }).catch((reason) => {
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
            <Form onSubmit={this.handleCreateMesa}>
              <Header as='h1'>Crear Mesa</Header>
                <Form.Input focus
                type='text'
                label='Nombre de la Autoridad Electoral'
                placeholder='Nombre de la Autoridad Electoral'
                value={this.state.autoridadElectoral}
                onChange={this.handleAutoridadElectoral}/>

                <DinamicListForm
                title='Candidatos'
                type='text'
                placeholder='Nombre de Candidato'
                items={this.state.candidatos}
                onAdd={this.handleAddCandidato}
                onDelete={this.handleRemoveCandidato}
                onUpdate={this.handleUpdateCandidato}/>
                <Button>Crear Mesa</Button>
            </Form>
          </Container>
        );
    }
}

export default CreateMesa2
