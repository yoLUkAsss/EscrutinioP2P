import React, { Component } from 'react';
import { Container, Form, Header, Button} from 'semantic-ui-react'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import ComponentTitle from '../utils/ComponentTitle.js'

//contratos
import ElectionContract from '../../build/contracts/Election.json'

class AddPresidenteDeMesa2 extends Component {
    constructor() {
        super();
        this.state = {
            autoridadElectoral : "",
            correoPresidente : "",
            passwordPresidente : "",
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
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          return instance.addPresidenteDeMesa.sendTransaction(
            this.state.autoridadElectoral,
            this.state.correoPresidente,
            this.state.passwordPresidente,
            this.state.idMesa,
            {from:accounts[0], gas: 3000000}
          )
        }).then((tx) => {
          console.log("transaction sent")
        }).catch((reason) => {
          console.log("catched some error")
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
            <Form.Input
                required
                type="password"
                title="Password del Presidente de Mesa"
                placeholder="Password del Presidente de Mesa"
                value={this.state.passwordPresidente}
                onChange={ (event) => { this.setState({ passwordPresidente : event.target.value }) } }
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
