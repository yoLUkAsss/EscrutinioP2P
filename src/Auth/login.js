/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import getWeb3 from '../utils/getWeb3'

/**
*   Contracts
*/
import UserElectionCRUDcontract from '../../build/contracts/UserElectionCRUD.json'
import UserContract from '../../build/contracts/User.json'
import contract from 'truffle-contract'

/**
usa los siguientes props:
* history viene con withRouter
*/
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            web3 : null
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

    handleLogin = async (event) => {
      const userElection = contract(UserElectionCRUDcontract)
      const user = contract(UserContract)
      userElection.setProvider(this.state.web3.currentProvider)
      user.setProvider(this.state.web3.currentProvider)

      let fromObject
      this.state.web3.eth.getAccounts((error, accounts) => {
        fromObject = {from:accounts[0]}
      })
      try{
        let userElectionInstance = await userElection.deployed()
        let userAddress = await userElectionInstance.getUserByEmail.call(this.state.email, fromObject)
        let userInstance = await user.at(userAddress)
        fromObject.gas = 3000000
        userInstance.login.sendTransaction(this.state.password, fromObject)
        delete fromObject.gas
        let currUser = await userInstance.getUser.call(fromObject)
        currentUser.setAddress(cookie, currUser[0])
        currentUser.setEmail(cookie, this.state.web3.toAscii(currUser[1]))
        currentUser.setCategory(cookie, currUser[2].toNumber())
        utils.showSuccess(this.msg, "Inicio de sesion exitoso", () => {this.props.history.push("/")} )
      } catch(err){
        utils.showError(this.msg, "Fallo en el inicio de sesion")
      }
    }
    render () {
        return (
          <div>
              <Container>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <ComponentTitle title='Iniciar Sesion'/>
              <Form>
                  <Form.Input
                      focus
                      required
                      inline
                      type='email'
                      label='Email'
                      placeholder='fiscal@email ex..'
                      value={this.state.email}
                      onChange={(evt) => {this.setState({ email : evt.target.value })}}
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
                  <Button onClick={this.handleLogin.bind(this)}>Iniciar Sesion</Button>
              </Form>
              </Container>
          </div>
        );
    }
}

export default withRouter(Login)
