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
import AuthHomeController from './AuthHomeController.js'
import UserElectionCRUD from '../../build/contracts/UserElectionCRUD.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

class AuthHome extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : ""
        }
        this.handleRegister = this.handleRegister.bind(this)
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

    handleRegister = (event) => {
      event.preventDefault()
      const userElection = contract(UserElectionCRUD)
      userElection.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        userElection.deployed().then( (userElectionCrudInstance) => {
        return userElectionCrudInstance.signup.sendTransaction(
          this.state.email,
          this.state.password,
        {from:accounts[0], gas : 3000000})
        }).then( (result) => {
          console.log("Transaction Sent")
        }).catch( (error) => {
          console.log("Error while executing transaction")
        })
      })
    }

    render () {
        return (
            <Center>
            <div>
                <Container>
                <ComponentTitle title='Autenticación'/>

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

                    <Button onClick={this.handleRegister}>
                        Registrar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default AuthHome
