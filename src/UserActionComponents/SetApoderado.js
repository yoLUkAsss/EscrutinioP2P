/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Header, Button, Form, Confirm} from 'semantic-ui-react'
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
            open : false
        }
    }

    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleSetApoderado(event) {
      event.preventDefault()
      api.setApoderadoDePartido(currentUser.getEmail(cookie), this.state.email, this.state.candidato).then(res => {
        utils.showSuccess(this.msg, "Apoderado del partido " + this.state.candidato + " configurado correctamente")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la carga del apoderado:" + error)
      })
      this.setState({open : false, email : "", candidato : ""})
    }

    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleApoderado = (event) => { this.setState({ email : event.target.value }) }
    render () {
        return (
            <Container text>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Header as='h3'>Asignar Apoderado de Partido</Header>
                <Form>
                    <Form.Input
                        required
                        type="email"
                        label='Apoderado'
                        placeholder='Correo del Apoderado'
                        value={this.state.email}
                        onChange={this.handleApoderado.bind(this)}
                    />
                    <Form.Input
                        required
                        type="text"
                        label='Candidato'
                        placeholder='Partido Policito asociado'
                        value={this.state.candidato}
                        onChange={this.handleCandidato.bind(this)}
                    />
                    <Button onClick={this.show.bind(this)}>Asignar</Button>
                    <Confirm
                      open={this.state.open}
                      header='Asignacion de Apoderado de Partido'
                      content={`Estas seguro de asignar al usuario ${this.state.email} como apoderado del candidato  ${this.state.candidato}`}
                      onCancel={this.close.bind(this)}
                      onConfirm={this.handleSetApoderado.bind(this)}
                    />
                </Form>
            </Container>
        );
    }
}

export default SetFiscal
