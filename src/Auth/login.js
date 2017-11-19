/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Header, Form , Grid, Segment, Message} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'

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
      api.login(this.state.email, this.state.password)
      .then(res => {
        currentUser.setUser(cookie, res.data)
        utils.showSuccessWithRedirect(this.msg, "El usuario: " + res.data.email + " ha iniciado sesion correctamente", () => {this.props.history.push("/")} )
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
                Iniciar Sesion en EP2P
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
                  <Button color='teal' basic fluid size='large' onClick={this.handleLogin.bind(this)}>Iniciar Sesion</Button>
                </Segment>
              </Form>
              <Message>
                Nuevo? <Link to={'/registrar'}>Registro</Link>
              </Message>
            </Grid.Column>
          </Grid>
          </div>
        );
    }
}

export default withRouter(Login)
