import React, { Component } from 'react'
import { Button, Header, Form , Grid, Segment, Message} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import AlertContainer from 'react-alert'
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
      api.signup(this.state.email, this.state.password)
      .then(res => {
        utils.showSuccess(this.msg, "Se ha registrado correctamente al usuario: " + res.data)
        this.setState({email : "", password : ""})
      })
      .catch(error => {
        utils.showError(this.msg, error.response.data)
      })
    }

    render () {
        return (
          <div>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Registrar Usuario en EP2P
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail'
                    type='email'
                    label='Email'
                    value={this.state.email}
                    onChange={this.handleEmail.bind(this)}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    type='password'
                    label='Contraseña'
                    placeholder='Contraseña'
                    value={this.state.password}
                    onChange={this.handlePassword.bind(this)}
                  />
                  <Button
                    color='teal'
                    basic
                    fluid
                    size='large'
                    disabled={!(this.state.email.length > 0 && this.state.password.length > 0)}
                    onClick={this.handleRegister.bind(this)}
                  >
                    Registrar Usuario
                  </Button>
                </Segment>
              </Form>
              <Message>
                Ya tienes cuenta? <Link to={'/acceder'}>Iniciar Sesion</Link>
              </Message>
            </Grid.Column>
          </Grid>
          </div>
        );
    }
}

export default withRouter(Signup)
