import React, { Component } from 'react';

import ElectionContract from '../../build/contracts/Election.json'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import {Form, Container, Button} from 'semantic-ui-react'

import DinamicListForm from '../utils/DinamicListForm.js'
import * as utils from '../utils/utils.js'

import cookie from 'react-cookies'
import AlertContainer from 'react-alert'

class CreateMesa extends Component {
    constructor() {
        super();
        this.state = {
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

    handleCreateMesa(event){
      event.preventDefault()
      let emailAutoridadElectoral = cookie.load("current_user_email")
      let csFiltered = utils.filterNoBlanks(utils.getNames(this.state.candidatos))
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((electionInstance) => {
          return electionInstance.createMesa.sendTransaction(emailAutoridadElectoral, csFiltered,
            {from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          utils.showSuccess(this.msg, "Creacion de mesa exitoso")
        }).catch((reason) => {
          utils.showError(this.msg, "Fallo en la creacion de mesa")
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
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Form>
                <DinamicListForm
                title='Candidatos'
                type='text'
                placeholder='Nombre de Candidato'
                items={this.state.candidatos}
                onAdd={this.handleAddCandidato}
                onDelete={this.handleRemoveCandidato}
                onUpdate={this.handleUpdateCandidato}/>
                <Button onClick={this.handleCreateMesa}>Crear Mesa</Button>
            </Form>
          </Container>
        );
    }
}

export default CreateMesa
