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

class SetFiscal extends Component {
    constructor() {
        super()
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          email : "",
          candidato : ""
      }
    }

    handleSetFiscal(event) {
      event.preventDefault()
      api.setFiscal(currentUser.getEmail(cookie), this.state.candidato, this.state.email, this.state.distritoId, this.state.escuelaId, this.state.mesaId).then(res => {
        utils.showSuccess(this.msg, "Fiscal Asignado")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la asignación del fiscal:" + error)
      })
    }

    handleFiscal = (event) => { this.setState({ email : event.target.value }) }
    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleDistrito = (event) => { this.setState({ distritoId : event.target.value }) }
    handleEscuela = (event) => { this.setState({ escuelaId : event.target.value }) }
    handleMesa = (event) => { this.setState({ mesaId : event.target.value }) }
    render () {
        return (
          <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Fiscal a una Mesa'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Fiscal'
                        placeholder='Correo del Fiscal'
                        value={this.state.email}
                        onChange={this.handleFiscal.bind(this)}
                    />
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Candidato'
                        placeholder='Partido Policito asociado'
                        value={this.state.candidato}
                        onChange={this.handleCandidato.bind(this)}
                    />
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
                    <Button onClick={this.handleSetFiscal.bind(this)}>
                        Setear fiscal
                    </Button>
                </Form>
              </Container>
            </div>
          </Center>
        );
    }
}

export default SetFiscal
