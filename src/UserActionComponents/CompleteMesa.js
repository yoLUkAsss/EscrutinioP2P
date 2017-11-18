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
// import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'

class CompleteMesa extends Component {
    constructor() {
        super()
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          personas : ""
        }
    }

    handleCompleteMesa = (event) => {
        event.preventDefault()
        api.cargarPersonasALaMesa(
            currentUser.getEmail(cookie), 
            parseInt(this.state.distritoId, 10), 
            parseInt(this.state.escuelaId, 10), 
            parseInt(this.state.mesaId, 10),
            parseInt(this.state.personas, 10)
        )
        .then(res => {
          utils.showSuccess(this.msg, res.data)
        })
        .catch(error => {
          utils.showError(this.msg, error.response.data)
        })
    }

    render () {
        return (
            <Center>
              <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <ComponentTitle title='Completar Mesa'/>
                  <Form>
                    <Form.Input
                      required
                      type='number'
                      label='ID del distrito'
                      placeholder='ID del distrito'
                      value={this.state.distritoId}
                      onChange={(event) => {this.setState({ distritoId : event.target.value })}}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='ID de la escuela'
                        placeholder='ID de la escuela'
                        value={this.state.escuelaId}
                        onChange={(event) => {this.setState({ escuelaId : event.target.value })}}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='ID de la mesa'
                        placeholder='ID de la mesa'
                        value={this.state.mesaId}
                        onChange={(event) => {this.setState({ mesaId : event.target.value })}}
                    />
                    <Form.Input
                        required
                        type='number'
                        label='Personas'
                        placeholder='Cantidad de personas'
                        value={this.state.personas}
                        onChange={(event) => {this.setState({ personas : event.target.value })}}
                    />
                    <Button basic color="green" onClick={this.handleCompleteMesa.bind(this)}>
                        Cargar Numero de Personas
                    </Button>
                  </Form>
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CompleteMesa)
