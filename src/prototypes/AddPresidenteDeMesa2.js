import React, { Component } from 'react';
import { Container, Form, Header, Button} from 'semantic-ui-react'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import ComponentTitle from '../utils/ComponentTitle.js'

//contratos
import ElectionContract from '../../build/contracts/Election.json'
import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

class AddPresidenteDeMesa2 extends Component {
    constructor() {
        super();
        this.state = {
            autoridadElectoral : "",
            correoPresidente : "",
            idMesa : 0,
            web3 : null
        }
        this.handleAddPresidenteDeMesa = this.handleAddPresidenteDeMesa.bind(this)
    }
    componentWillMount() {
        getWeb3.then(results => {
            this.setState({web3: results.web3})
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }
    handleAddPresidenteDeMesa = (event) => {
      event.preventDefault()
      const election = contract(ElectionContract)
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      let mesaCRUDInstance
      election.setProvider(this.state.web3.currentProvider)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((electionInstance) => {
          return electionInstance.getMesaCRUDaddress.call(this.state.autoridadElectoral, {from:accounts[0]})
        }).then((mesaCRUDaddress) => {
          return mesaElectionCRUD.at(mesaCRUDaddress)
        }).then((instance) => {
          mesaCRUDInstance = instance
          return mesaCRUDInstance.setPresidenteDeMesa.estimateGas(this.state.idMesa, this.state.correoPresidente, {from:accounts[0]})
        }).then((gasEstimated) => {
          return mesaCRUDInstance.setPresidenteDeMesa.sendTransaction(this.state.idMesa, this.state.correoPresidente,
            {from:accounts[0], gas:gasEstimated})
        }).then((tx) => {
          console.log("transaction sent")
        }).catch((err) => {
          console.log("something happen")
        })
      })
    }

    render () {
      return (
        <Container>
          <ComponentTitle title='Definir Presidente de Mesa'/>
          <Form onSubmit={this.handleAddPresidenteDeMesa}>
            <Header as='h3'>Autoridad Electoral (Delegado General)</Header>
            <Form.Input
                required
                type="mail"
                title="Correo de la Autoridad Electoral"
                placeholder="Correo de la Autoridad Electoral"
                value={this.state.autoridadElectoral}
                onChange={ (event) => { this.setState({ autoridadElectoral : event.target.value }) } }
            />
            <Header as='h3'>Presidente de Mesa</Header>
            <Form.Input
                required
                type="mail"
                title="Nombre del Presidente de Mesa"
                placeholder="Nombre del Presidente de Mesa"
                value={this.state.correoPresidente}
                onChange={ (event) => { this.setState({ correoPresidente : event.target.value }) } }
            />
            <Header as='h3'>Numero de Mesa</Header>
            <Form.Input
                required
                type="mail"
                title="ID de Mesa"
                placeholder="ID de Mesa"
                value={this.state.idMesa}
                onChange={ (event) => { this.setState({ idMesa : event.target.value }) } }
            />
            <Button>Setear presidente</Button>
        </Form>
      </Container>
    )
  }
}

export default AddPresidenteDeMesa2
