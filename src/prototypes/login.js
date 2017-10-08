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
      const userElection = contract(UserElectionCRUD)
      let crud
      userElection.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        userElection.deployed().then((instance) => {
          crud = instance
          return crud.login.sendTransaction(this.state.email, this.state.password,{from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          console.log(tx)
          console.log("tx sent")
          crud.LogLogin().watch((err, result)=>{
            if(!err){
              cookie.save("email", result.args.email)
              cookie.save("current_user_address", result.args.userAddress, {path : "/"})
              utils.showWithRedirect(this.msg, "Logged correctly", "/", this.context)
            }
          })
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
