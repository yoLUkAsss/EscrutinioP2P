import React, { Component } from 'react';
import { Container, Form, Header, Button} from 'semantic-ui-react'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import ComponentTitle from '../utils/ComponentTitle.js'

//contratos
import ElectionContract from '../../build/contracts/Election.json'

class AddFiscal2 extends Component {
    constructor() {
        super();
        this.state = {
            autoridadElectoral : "",
            correoFiscal : "",
            passwordFiscal : "",
            idMesa : 0,
            web3 : null
        }
        this.handleAddFiscal = this.handleAddFiscal.bind(this)
    }
    componentWillMount() {
        getWeb3.then(results => {
            this.setState({web3: results.web3})
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }
    handleAddFiscal = (event) => {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          return instance.addFiscal.sendTransaction(
            this.state.autoridadElectoral,
            this.state.correoFiscal,
            this.state.passwordFiscal,
            this.state.idMesa,
            {from:accounts[0], gas: 3000000}
          )
        }).then((tx) => {
          console.log("transaction sent")
        }).catch((error) => {
          console.log(error)
          console.log("some errorocurred")
        })
      })
    }

    render () {
      return (
        <Container>
          <ComponentTitle title='Definir Fiscal de Mesa'/>
          <Form onSubmit={this.handleAddFiscal}>
            <Header as='h3'>Autoridad Electoral (Delegado General)</Header>
            <Form.Input
                required
                type="mail"
                title="Correo de la Autoridad Electoral"
                placeholder="Correo de la Autoridad Electoral"
                value={this.state.autoridadElectoral}
                onChange={ (event) => { this.setState({ autoridadElectoral : event.target.value }) } }
            />
            <Header as='h3'>Fiscal de Mesa</Header>
            <Form.Input
                required
                type="mail"
                title="Nombre del Fiscal"
                placeholder="Nombre del Fiscal"
                value={this.state.correoFiscal}
                onChange={ (event) => { this.setState({ correoFiscal : event.target.value }) } }
            />
            <Form.Input
                required
                type="password"
                title="Password del Fiscal"
                placeholder="Password del Fiscal"
                value={this.state.passwordFiscal}
                onChange={ (event) => { this.setState({ passwordFiscal : event.target.value }) } }
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
            <Button>Setear Fiscal</Button>
        </Form>
      </Container>
    )
  }
}

export default AddFiscal2
