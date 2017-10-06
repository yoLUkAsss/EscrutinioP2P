import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import { Container, Form, Header, Button} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'


import ElectionContract from '../../build/contracts/Election.json'
import UserElectionCRUDContract from '../../build/contracts/UserElectionCRUD.json'

class AddApoderadoDePartido2 extends Component {
    constructor() {
        super()
        this.state = {
            correoApoderadoDePartido : "",
            passwordApoderadoDePartido : "",
            autoridadElectoral : "",
            idMesa : 0
        }
        this.handleAddApoderadoDePartido = this.handleAddApoderadoDePartido.bind(this)
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

    handleAddApoderadoDePartido = (event) => {
      event.preventDefault()
      const election = contract(ElectionContract)
      const userCRUD = contract(UserElectionCRUDContract)
      let userCRUDinstance
      election.setProvider(this.state.web3.currentProvider)
      userCRUD.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((electionInstance) => {
          return electionInstance.getUserCRUDaddress.call(this.state.autoridadElectoral, {from:accounts[0]})
        }).then((userElectionAddress) => {
          return userCRUD.at(userElectionAddress)
        }).then((userInstance) => {
          userCRUDinstance = userInstance
          return userCRUDinstance.createApoderadoDePartido.estimateGas(this.state.correoApoderadoDePartido, "", {from:accounts[0]})
        }).then((gasEstimated) => {
          return userCRUDinstance.createApoderadoDePartido.sendTransaction(this.state.correoApoderadoDePartido, "", {from:accounts[0], gas:gasEstimated})
        }).then((tx) => {
          console.log(tx)
          console.log("transaction sent")
        }).catch((err) => {
          console.log(err)
          console.log("something happen")
        })
      }).catch((err) => {
        console.log(err)
      })
    }

    render () {
        return (
            <Container>
                <ComponentTitle title='Definir Apoderado de Partido'/>
                <Form onSubmit={this.handleAddApoderadoDePartido}>
                    <Header as='h3'>Autoridad Superior (Autoridad de Comicio)</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Correo de la Autoridad Electoral"
                        placeholder="Correo de la Autoridad Electoral"
                        value={this.state.autoridadElectoral}
                        onChange={ (event) => { this.setState({ autoridadElectoral : event.target.value }) } }
                    />
                    <Header as='h3'>Apoderado de Partido</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Nombre del Apoderado de Partido"
                        placeholder="Nombre del Apoderado de Partido"
                        value={this.state.correoApoderadoDePartido}
                        onChange={ (event) => { this.setState({ correoApoderadoDePartido : event.target.value }) } }
                    />
                    <Form.Input
                        required
                        type="password"
                        title="Password del Apoderado de Partido"
                        placeholder="Password del Apoderado de Partido"
                        value={this.state.passwordApoderadoDePartido}
                        onChange={ (event) => { this.setState({ passwordApoderadoDePartido : event.target.value }) } }
                    />

                    <Button>Agregar Apoderado de Partido</Button>
                </Form>
            </Container>
        )
    }
}

export default AddApoderadoDePartido2
