/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import ElectionContract from '../../build/contracts/Election.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

class CreateAutoridadElectoral extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : ""
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

    handleCreateAutoridadElectoral = (event) => {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then( (electionInstance) => {
        return electionInstance.createElection.sendTransaction(
          this.state.email,
          this.state.password,
        {from:accounts[0], gas : 3000000})
        }).then( (result) => {
          utils.showSuccess(this.msg, "Registro exitoso")
        }).catch( (error) => {
          utils.showError(this.msg, "Fallo en el registro see:" + error)
        })
      })
    }

    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Crear Autoridad Electoral'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }/>
                    <Form.Input
                        required
                        inline
                        label='Contraseña'
                        placeholder='Contraseña'
                        value={this.state.password}
                        onChange={ (event) => { this.setState({ password : event.target.value }) } }/>
                    <Button onClick={this.handleCreateAutoridadElectoral.bind(this)}>
                        Registrar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default CreateAutoridadElectoral
