/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Header, Button, Form } from 'semantic-ui-react'
// import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

/**
 * Components
 */
// import ComponentTitle from '../utils/ComponentTitle.js'
/**
 * Controller for Component
 */
// import contract from 'truffle-contract'
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
/**
 * Contracts
*/
// import ElectionContract from '../../build/contracts/Election.json'
// import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'

class CreateDistrito extends Component {
    constructor() {
        super()
        this.state = {
          escuelas : "",
          distrito : ""
        }
    }
    handleCreateDistrito(event) {
      event.preventDefault()
      api.initDistrito(currentUser.getEmail(cookie), parseInt(this.state.distrito, 10), parseInt(this.state.escuelas, 10)).then((res) => {
        console.log(res)
        utils.showSuccess(this.msg, "Distrito creado correctamente")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, error.response.data)
      })
    }

    handleEscuelas = (event) => {
      this.setState({ escuelas : event.target.value })
    }
    handleDistrito = (event) => {
      this.setState({ distrito : event.target.value })
    }
    render () {
        return (
              <Container text>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                  <Header as='h3'>Crear Distrito</Header>
                  <Form>
                    <Form.Input
                      required
                      type='number'
                      label='ID del Distrito'
                      placeholder='ID del distrito'
                      value={this.state.distrito}
                      onChange={this.handleDistrito.bind(this)}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='Cantidad de Escuelas'
                        placeholder='Escuelas'
                        value={this.state.escuelas}
                        onChange={this.handleEscuelas.bind(this)}
                    />
                    <Button onClick={this.handleCreateDistrito.bind(this)}>
                        Crear Distrito
                    </Button>
                  </Form>
              </Container>
        );
    }
}

export default withRouter(CreateDistrito)
