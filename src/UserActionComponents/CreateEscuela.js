/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'
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
            <Center>
              <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <ComponentTitle title='Crear Mesas para una escuela'/>
                  <Form>
                    <Form.Input
                        required
                        type='number'
                        label='distrito id'
                        placeholder='distrito id'
                        value={this.state.distritoId}
                        onChange={this.handleDistritos.bind(this)}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='escuela id'
                        placeholder='escuela id'
                        value={this.state.escuelaId}
                        onChange={this.handleEscuelas.bind(this)}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='cantidad de mesas'
                        placeholder='cantidad de mesas'
                        value={this.state.cantidadMesas}
                        onChange={this.handleMesas.bind(this)}
                    />
                    <Button onClick={this.handleCreateEscuela.bind(this)}>
                        Crear Mesas
                    </Button>
                  </Form>
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateEscuela)
