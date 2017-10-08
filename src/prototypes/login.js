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
import UserElectionCRUDcontract from '../../build/contracts/UserElectionCRUD.json'
import UserContract from '../../build/contracts/User.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

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
      const userElection = contract(UserElectionCRUDcontract)
      const user = contract(UserContract)
      let newAddress
      userElection.setProvider(this.state.web3.currentProvider)
      user.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        userElection.deployed().then((instance) => {
          return instance.getUserByEmail.call(this.state.email, {from:accounts[0]})
        }).then((userAddr)=> {
          newAddress = userAddr
          return user.at(userAddr)
        }).then((userInstance) => {
          return userInstance.login.sendTransaction(this.state.password, {from:accounts[0], gas:3000000})
        }).then((tx) => {
          console.log(tx)
          cookie.save("email", this.state.email)
          cookie.save("current_user_address", newAddress, {path : "/"})
          utils.showWithRedirect(this.msg, "Logged correctly", "/", this.context)
        }).catch((reason) => {
          console.log("catched reason")
          console.log(reason)
        })
      })
    }

    render () {
        return (
          <Center>
          <div>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
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