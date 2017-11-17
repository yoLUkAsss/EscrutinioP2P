/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Header, Container, Form , Grid, Segment, Message} from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
// import Center from 'react-center'
import AlertContainer from 'react-alert'

/**
 * Components
 */
// import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
// import contract from 'truffle-contract'
// import UserElectionCRUD from '../../build/contracts/UserElectionCRUD.json'
// import getWeb3 from '../utils/getWeb3'
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
        utils.showSuccess(this.msg, "Registro Exitoso")
        this.setState({email : "", password : ""})
        // utils.showSuccess(this.msg, "Registro exitoso", () => {this.props.history.push("/")})
      }).catch(error => {
        utils.showError(this.msg, error.response.data)
      })
    }

    render () {
        return (
          <Container>
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
                  <Button color='teal' fluid size='large' onClick={this.handleRegister.bind(this)}>Registrar Usuario</Button>
                </Segment>
              </Form>
              <Message>
                Ya tienes cuenta? <Link to={'/acceder'}>Iniciar Sesion</Link>
              </Message>
            </Grid.Column>
          </Grid>
          </Container>
        );
    }
}

export default withRouter(Signup)
// <Center>
// <div>
//     <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
//     <Container>
//     <ComponentTitle title='Registro'/>
//     <Form>
//         <Form.Input
//             required
//             inline
//             type='email'
//             label='Email'
//             placeholder='Email'
//             value={this.state.email}
//             onChange={this.handleEmail.bind(this)}
//         />
//         <Form.Input
//             required
//             inline
//             type='password'
//             label='Contraseña'
//             placeholder='Contraseña'
//             value={this.state.password}
//             onChange={this.handlePassword.bind(this)}
//         />
//         <Button onClick={this.handleRegister}>
//             Registrar
//         </Button>
//     </Form>
//     </Container>
// </div>
// </Center>
