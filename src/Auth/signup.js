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
import * as api from '../utils/api-call.js'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : ""
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleEmail = (event) => {
      this.setState({ email : event.target.value })
    }

    handlePassword = (event) => {
      this.setState({ password : event.target.value })
    }

    handleRegister = (event) => {
      event.preventDefault()
      api.signup(this.state.email, this.state.password).then(res => {
        // utils.showSuccess(this.msg, "Registro Exitoso")
            utils.showSuccess(this.msg, "Registro exitoso", () => {this.props.history.push("/")})
      }).catch(err => {
        utils.showError(this.msg, "Fallo en el registro")
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
