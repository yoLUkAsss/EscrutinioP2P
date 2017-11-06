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

class SetVicepresidenteDeMesa extends Component {
    constructor() {
        super()
        this.state = {
          email : "",
          mesa : "",
          open : false
        }
        this.distrito = currentUser.getDistrito(cookie)
        this.escuela = currentUser.getEscuela(cookie)
    }

    handleSetVicepresidenteDeMesa(event) {
      event.preventDefault()
      api.setPresidenteDeMesa(currentUser.getEmail(cookie), this.state.email, this.distrito, this.escuela, this.mesa).then(res => {
        utils.showSuccess(this.msg, "Seteado vicepresidente de mesa")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en el seteo del vicepresidente:" + error)
      })
      this.setState({open : false, email : "", mesa : ""})
    }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    handleVicepresidente = (event) => { this.setState({ email : event.target.value }) }
    handleMesa = (event) => { this.setState({ mesa : event.target.value }) }
    render () {
        return (
            <Container text>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h3'>Asignar Vicepresidente de Mesa</Header>
              <Form>
                <Form.Input
                    required
                    type="email"
                    label='Email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleVicepresidente.bind(this)}
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
                  header='Asignacion de Vicepresidente'
                  content={`Estas seguro de asignar al usuario ${this.state.email} como vicepresidente de la mesa ${this.distrito}${this.escuela}${this.mesa}`}
                  onCancel={this.close.bind(this)}
                  onConfirm={this.handleSetVicepresidenteDeMesa.bind(this)}
                />
              </Form>
            </Container>
        );
    }
}

export default SetVicepresidenteDeMesa
