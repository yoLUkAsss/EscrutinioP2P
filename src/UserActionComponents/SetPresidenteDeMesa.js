/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form, Confirm, Header} from 'semantic-ui-react'
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

class SetPresidenteDeMesa extends Component {
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

    handleSetPresidenteDeMesa(event) {
      event.preventDefault()
      api.setPresidenteDeMesa(currentUser.getEmail(cookie), this.state.email, this.distrito, this.escuela, this.state.mesa).then(res => {
        utils.showSuccess(this.msg, "Seteado presidente de mesa")
      }).catch(error => {
        utils.showError(this.msg, "Fallo en el seteo del presidente:" + error)
      })
      this.setState({open : false, email : "", mesa : ""})
    }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    handlePresidente = (event) => { this.setState({ email : event.target.value }) }
    handleMesa = (event) => { this.setState({ mesa : event.target.value }) }
    render () {
        return (
            <Container text>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h3'>Asignar Presidente de Mesa</Header>
              <Form>
                <Form.Input
                    required
                    type="email"
                    label='Email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handlePresidente.bind(this)}
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
                  header='Asignacion de Presidente'
                  content={`Estas seguro de asignar al usuario ${this.state.email} como presidente de la mesa ${this.distrito}${this.escuela}${this.state.mesa}`}
                  onCancel={this.close.bind(this)}
                  onConfirm={this.handleSetPresidenteDeMesa.bind(this)}
                />
              </Form>
            </Container>
        );
    }
}

export default SetPresidenteDeMesa
