/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import contract from 'truffle-contract'
import UserElectionCRUD from '../../build/contracts/UserElectionCRUD.json'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'

class Signup extends Component {
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
          utils.showSuccess(this.msg, "Registro exitoso")
          this.props.history.push("/")
        }).catch( (error) => {
          console.log("Error while executing transaction")
          console.log("ERROR: " + JSON.stringify(error, undefined, 2))
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
                <ComponentTitle title='Registro'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type='email'
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }
                    />
                    <Form.Input
                        required
                        inline
                        type='password'
                        label='Contraseña'
                        placeholder='Contraseña'
                        value={this.state.password}
                        onChange={ (event) => { this.setState({ password : event.target.value }) } }
                    />
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

export default withRouter(Signup)
