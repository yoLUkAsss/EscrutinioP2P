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
import * as api from '../utils/api-call.js'
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
            password : ""
        }
    }

    handleEmail = (evt) => {this.setState({ email : evt.target.value })}
    handlePassword = (event) => { this.setState({ password : event.target.value }) }

    handleLogin = (event) => {
      event.preventDefault()
      api.login(this.state.email, this.state.password).then(res => {
        console.log(res)
        currentUser.setUser(cookie, res.data)
        // utils.showSuccess(this.msg, "Inicio de sesion exitoso")
        utils.showSuccess(this.msg, "Inicio de sesion exitoso", () => {this.props.history.push("/")} )
      }).catch(error => {
        console.log(JSON.stringify(error, undefined, 2))
        utils.showError(this.msg, error.response.data)
      })
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
                      onChange={this.handleEmail.bind(this)}
                  />
                  <Form.Input
                      required
                      inline
                      type='password'
                      label='Contraseña'
                      placeholder='Contraseña'
                      value={this.state.password}
                      onChange={this.handlePassword.bind(this)}
                  />
                  <Button onClick={this.handleLogin.bind(this)}>Iniciar Sesion</Button>
              </Form>
              </Container>
          </div>
        );
    }
}

export default withRouter(Login)
