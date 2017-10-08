/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Center from 'react-center'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import UserElectionCRUD from '../../build/contracts/UserElectionCRUD.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import cookie from 'react-cookies'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            web3 : null
        }
        this.handleLogin = this.handleLogin.bind(this)
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

    handleLogin = (event) => {
      event.preventDefault()
      const userElection = contract(UserElectionCRUD)
      userElection.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        userElection.deployed().then((instance) => {
          return instance.login.sendTransaction(this.state.email, this.state.password,{from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          console.log(tx)
          console.log("tx sent")
          cookie.save("current_user_address", tx, {path : "/"})
        }).catch((reason) => {
          console.log(reason)
        })
      })
    }
    render () {
        return (
          <Center>
          <div>
              <ComponentTitle title='Log in'/>
              <Form>
                  <Form.Input
                      focus
                      required
                      inline
                      type='email'
                      label='Email'
                      placeholder='fiscal@email ex..'
                      value={this.state.email}
                      onChange={(evt) => {this.setState({ email : evt.target.value })}}/>

                  <Form.Input
                      required
                      inline
                      label='Contraseña'
                      placeholder='Contraseña'
                      value={this.state.password}
                      onChange={ (event) => { this.setState({ password : event.target.value }) } }/>

                  <Button onClick={this.handleLogin}>Log in</Button>
              </Form>
          </div>
          </Center>
        );
    }
}

export default Login
