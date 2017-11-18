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

class CreateEscuela extends Component {
    constructor() {
        super()
        this.state = {
          distritoId : "",
          escuelaId : "",
          cantidadMesas : ""
        }
    }
    handleCreateEscuela(event) {
      event.preventDefault()
      api.initEscuela(currentUser.getEmail(cookie), parseInt(this.state.distritoId, 10), parseInt(this.state.escuelaId, 10), parseInt(this.state.cantidadMesas, 10))
      .then(res => {
        utils.showSuccess(this.msg, res.data)
      })
      .catch(error => {
        utils.showError(this.msg, error.response.data)
      })
    }

    handleMesas = (event) => {
      this.setState({ cantidadMesas : event.target.value })
    }
    handleEscuelas = (event) => {
      this.setState({ escuelaId : event.target.value })
    }
    handleDistritos = (event) => {
      this.setState({ distritoId : event.target.value })
    }

    render () {
        return (
              <Container text>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Header as='h3'>Crear Mesas para una escuela</Header>
                <Form>
                  <Form.Input
                      required
                      type='number'
                      label='ID del Distrito'
                      placeholder='ID del Distrito'
                      value={this.state.distritoId}
                      onChange={this.handleDistritos.bind(this)}
                  />
                  <Form.Input
                      required
                      type='number'
                      label='ID de la Escuela'
                      placeholder='ID de la Escuela'
                      value={this.state.escuelaId}
                      onChange={this.handleEscuelas.bind(this)}
                  />
                  <Form.Input
                      required
                      type='number'
                      label='Cantidad de Mesas'
                      placeholder='Mesas'
                      value={this.state.cantidadMesas}
                      onChange={this.handleMesas.bind(this)}
                  />
                  <Button basic color="green" onClick={this.handleCreateEscuela.bind(this)}>
                      Crear Mesas
                  </Button>
                </Form>
              </Container>
        );
    }
}

export default withRouter(CreateEscuela)
