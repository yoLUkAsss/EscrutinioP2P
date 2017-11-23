/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Form, Confirm, Header } from 'semantic-ui-react'
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
          mesas : [],
          open : false
        }
        this.distrito = currentUser.getDistrito(cookie)
        this.escuela = currentUser.getEscuela(cookie)
    }

    componentWillMount(){
      api.getMesas(currentUser.getDistrito(cookie), currentUser.getEscuela(cookie)).then(res => {
        console.log(res.data)
        this.setState({mesas : res.data.map((x, idX) => {return {key : idX, value : x, text : x}})})
      }).catch(error => {
        console.log(error)
      })
    }

    handleSetVicepresidenteDeMesa(event) {
      event.preventDefault()
      api.setVicepresidenteDeMesa(currentUser.getEmail(cookie), this.state.email, this.distrito, this.escuela, this.state.mesa)
      .then(res => {
        utils.showSuccess(this.msg, res.data)
      })
      .catch(error => {
        utils.showError(this.msg, error.response.data)
      })
      this.setState({open : false, email : "", mesa : ""})
    }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    handleVicepresidente = (event) => { this.setState({ email : event.target.value }) }
    handleMesa = (event, {value}) => { this.setState({ mesa : value }) }
    render () {
        return (
            <div>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h2' textAlign='center'>Asignar Vicepresidente de Mesa</Header>
              <Form>
                <Form.Input
                    required
                    type="email"
                    label='Email'
                    placeholder='Email'
                    value={this.state.email}
                    onChange={this.handleVicepresidente.bind(this)}
                />
                <Form.Dropdown
                  required
                  label='ID de la Mesa'
                  placeholder='Mesa'
                  options={this.state.mesas}
                  selection
                  value={this.state.mesa}
                  onChange={this.handleMesa.bind(this)}
                />
                <Button basic color="green" disabled={this.state.email.length === 0 || this.state.mesa.length === 0} onClick={this.show.bind(this)}>Asignar</Button>
                <Confirm
                  open={this.state.open}
                  header='Asignacion de Vicepresidente'
                  content={`Estas seguro de asignar al usuario: ${this.state.email}, como vicepresidente de la mesa: ${this.state.mesa} de la escuela: ${this.escuela} del distrito: ${this.distrito}`}
                  onCancel={this.close.bind(this)}
                  onConfirm={this.handleSetVicepresidenteDeMesa.bind(this)}
                />
              </Form>
            </div>
        );
    }
}

export default SetVicepresidenteDeMesa
// <Form.Field
//   control='input'
//   min={1}
//   required
//   type='number'
//   label='ID de la Mesa'
//   placeholder='ID de la Mesa'
//   value={this.state.mesa}
//   onChange={this.handleMesa.bind(this)}
// />
