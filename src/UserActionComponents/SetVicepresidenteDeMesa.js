/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */

import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
import cookie from 'react-cookies'

class SetVicepresidenteDeMesa extends Component {
    constructor() {
        super()
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          email : ""
        }
    }

    handleSetVicepresidenteDeMesa(event) {
      event.preventDefault()
      api.setPresidenteDeMesa(currentUser.getEmail(cookie), this.state.email, this.state.distritoId, this.state.escuelaId, this.state.mesaId).then(res => {
        utils.showSuccess(this.msg, "Seteado vicepresidente de mesa")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en el seteo del vicepresidente:" + error)
      })
    }
    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleDistrito = (event) => { this.setState({ distritoId : event.target.value }) }
    handleEscuela = (event) => { this.setState({ escuelaId : event.target.value }) }
    handleMesa = (event) => { this.setState({ mesaId : event.target.value }) }
    handleVicepresidente = (event) => { this.setState({ email : event.target.value }) }
    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Vicepresidente de Mesa'/>
                <Form>
                <Form.Input
                  required
                  type='number'
                  label='distrito id'
                  placeholder='distrito id'
                  value={this.state.distritoId}
                  onChange={this.handleDistrito.bind(this)}
                />
                <Form.Input
                  required
                  type='number'
                  label='escuela id'
                  placeholder='escuela id'
                  value={this.state.escuelaId}
                  onChange={this.handleEscuela.bind(this)}
                />
                <Form.Input
                  required
                  type='number'
                  label='mesa id'
                  placeholder='mesa id'
                  value={this.state.mesaId}
                  onChange={this.handleMesa.bind(this)}
                />
                <Form.Input
                    required
                    inline
                    type="email"
                    label='Email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleVicepresidente.bind(this)}
                />
                    <Button onClick={this.handleSetVicepresidenteDeMesa.bind(this)}>
                        Asignar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetVicepresidenteDeMesa
