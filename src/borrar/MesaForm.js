import React, { Component } from 'react';
import ElectionContract from '../build/contracts/Election.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'
import {Form, Header, Button, List, Divider, Container} from 'semantic-ui-react'
import DinamicListForm from './DinamicListForm.js'

import * as utils from './utils/utils.js'

class MesaForm extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          apoderado : {name : ''},
          participantes : [{name: ''}],
          candidatos : [{name: ''}],
          web3 : null,
          addresses : []
        }
        this.handleCreateMesa = this.handleCreateMesa.bind(this)
        this.updateMesas = this.updateMesas.bind(this)
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

    updateMesas(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      var electionInstance
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.getMesas.call(accounts[0])
        }).then((mesas) => {
          return this.setState({addresses: mesas})
        })
      })
    }

    handleNameChange = (evt) => {
      this.setState({ name: evt.target.value })
    }

    handleApoderadoChange = (evt) => {
      this.setState({ apoderado: {name : evt.target.value} })
    }

    //esta harcodeado la cantidad de mesas creadas deberia ser una
    handleCreateMesa(event){
      event.preventDefault()
      const election = contract(ElectionContract)
      var electionInstance
      election.setProvider(this.state.web3.currentProvider)
      var ps = utils.filterNoBlanks(utils.getNames(this.state.participantes))
      var cs = utils.filterNoBlanks(utils.getNames(this.state.candidatos))
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.createNMesas.estimateGas(this.state.apoderado.name, ps, cs, 10, 1, {from: accounts[0]})
        }).then((gasEstimated) => {
          return electionInstance.createNMesas.sendTransaction(this.state.apoderado.name, ps, cs, 10, 1, {from: accounts[0], gas: gasEstimated})
        }).then((idtx) => {
          alert("Transaccion enviada")
        })
      })
    }

    //manejo de lista de participantes
    handleAddParticipante = () => {
      this.setState({ participantes: this.state.participantes.concat([{ name: '' }]) })
    }

    handleUpdateParticipante = (idx) => (evt) => {
      const newParticipantes = this.state.participantes.map((participante, pidx) => {
        if (idx !== pidx) return participante
        return { ...participante, name: evt.target.value }
      })
      this.setState({ participantes: newParticipantes})
    }

    handleRemoveParticipante = (idx) => () => {
      this.setState({ participantes: this.state.participantes.filter((s, sidx) => idx !== sidx) })
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
                label='Nombre de la Mesa'
                placeholder='Nombre de la Mesa'
                value={this.state.name}
                onChange={this.handleNameChange}/>
                <Form.Input focus
                type='text'
                label='Nombre del apoderado'
                placeholder='Nombre del apoderado'
                value={this.state.apoderado.name}
                onChange={this.handleApoderadoChange}/>
                <DinamicListForm
                title='Participantes'
                type='text'
                placeholder='Nombre de Participante'
                items={this.state.participantes}
                onAdd={this.handleAddParticipante}
                onDelete={this.handleRemoveParticipante}
                onUpdate={this.handleUpdateParticipante}/>
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

            <Divider section />
            <Header as='h3'>Ver direcciones de mesas</Header>
            <Button onClick={this.updateMesas}>
              Ver direcciones de las mesas
            </Button>
            {
              <List>
                {this.state.addresses.map((a, indA) => {
                  return (<List.Item>{a}</List.Item>)
                })}
              </List>
            }
          </Container>
        );
    }
}

export default MesaForm
