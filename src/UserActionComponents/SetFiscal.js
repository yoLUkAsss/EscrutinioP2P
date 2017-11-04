/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Header, Form, Confirm } from 'semantic-ui-react'
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

class SetFiscal extends Component {
    constructor() {
        super()
        this.state = {
          email : "",
          candidato : "",
          distrito : "",
          escuela : "",
          mesa : "",
          open : false
        }
    }

    handleSetFiscal(event) {
      event.preventDefault()
      api.setFiscal(currentUser.getEmail(cookie), this.state.candidato, this.state.email, this.state.distrito, this.state.escuela, this.state.mesa).then(res => {
        utils.showSuccess(this.msg, "Fiscal Asignado")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la asignación del fiscal:" + error)
      })
      this.setState({open : false})
    }

    handleFiscal = (event) => { this.setState({ email : event.target.value }) }
    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleDistrito = (event) => { this.setState({ distrito : event.target.value }) }
    handleEscuela = (event) => { this.setState({ escuela : event.target.value }) }
    handleMesa = (event) => { this.setState({ mesa : event.target.value }) }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    render () {
        return (
            <Container text>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h3'>Asignar Fiscal a una Mesa</Header>
              <Form>
                  <Form.Input
                      required
                      type="email"
                      label='Correo del Fiscal'
                      placeholder='Correo del Fiscal'
                      value={this.state.email}
                      onChange={this.handleFiscal.bind(this)}
                  />
                  <Form.Input
                      required
                      type="email"
                      label='Candidato'
                      placeholder='Partido Policito asociado'
                      value={this.state.candidato}
                      onChange={this.handleCandidato.bind(this)}
                  />
                  <Form.Field
                    control='input'
                    min={1}
                    required
                    type='number'
                    label='ID del Distrito'
                    placeholder='ID del Distrito'
                    value={this.state.distrito}
                    onChange={this.handleDistrito.bind(this)}
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
                  <Form.Field
                    control='input'
                    min={1}
                    required
                    type='number'
                    label='ID de la Mesa'
                    placeholder='ID de la Mesa'
                    value={this.state.mesa}
                    onChange={this.handleMesa.bind(this)}
                  />
                  <Button onClick={this.show.bind(this)}>Asignar</Button>
                  <Confirm
                    open={this.state.open}
                    header='Asignacion de Fiscal de Mesa'
                    content={`Estas seguro de asignar al usuario ${this.state.email} como fiscal de la mesa ${this.state.distrito}${this.state.escuela}${this.state.mesa} para el candidato ${this.state.candidato}`}
                    onCancel={this.close.bind(this)}
                    onConfirm={this.handleSetFiscal.bind(this)}
                  />
              </Form>
            </Container>
        );
    }
}

export default SetFiscal
