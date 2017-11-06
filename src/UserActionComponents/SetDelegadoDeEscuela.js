/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form, Confirm, Header } from 'semantic-ui-react'
// import Center from 'react-center'

/**
 * Components
 */
// import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
import cookie from 'react-cookies'

class SetDelegadoDeEscuela extends Component {
    constructor() {
        super()
        this.state = {
            correoDelegado : "",
            escuela : "",
            open : false
        }
        this.distrito = currentUser.getDistrito(cookie)
    }
    handleSetDelegadoDeEscuela(event) {
      event.preventDefault()
      api.setDelegadoDeEscuela(currentUser.getEmail(cookie), this.state.correoDelegado, this.distrito, this.state.escuela).then(res => {
        utils.showSuccess(this.msg, "Delegado de Distrito Asignado Correctamente")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la :" + error)
      })
      this.setState({open : false, correoDelegado : "", escuela : ""})
    }
    handleDelegadoEscuela = (event) => { this.setState({ correoDelegado : event.target.value }) }
    handleEscuela = (event) => { this.setState({ escuela : event.target.value }) }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render () {
        return (
            <Container text>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h3'>Asignar Delegado de Escuela</Header>
              <Form>
                  <Form.Input
                      required
                      type="email"
                      label='Delegado'
                      placeholder='Correo del Delegado'
                      value={this.state.correoDelegado}
                      onChange={this.handleDelegadoEscuela.bind(this)}
                  />
                  <Form.Field
                    control='input'
                    min={1}
                    required
                    type='number'
                    label='ID de la Escuela'
                    placeholder='ID de la Escuela'
                    value={this.state.escuela}
                    onChange={this.handleEscuela.bind(this)}
                  />
                  <Button onClick={this.show.bind(this)}>Asignar</Button>
                  <Confirm
                    open={this.state.open}
                    header='Asignacion de Delegado de Escuela'
                    content={`Estas seguro de asignar al usuario ${this.state.correoDelegado} como delegado de la escuela ${this.distrito}${this.state.escuela}`}
                    onCancel={this.close.bind(this)}
                    onConfirm={this.handleSetDelegadoDeEscuela.bind(this)}
                  />
              </Form>
            </Container>
        );
    }
}

export default SetDelegadoDeEscuela
