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

class SetDelegadoDeDistrito extends Component {
    constructor() {
        super()
        this.state = {
            correoDelegado : "",
            idDelDistrito : ""
        }
    }

    handleSetDelegadoDeDistrito(event) {
      event.preventDefault()
      api.setDelegadoDeDistrito(currentUser.getEmail(cookie), this.state.correoDelegado, this.state.idDelDistrito).then(res => {
        utils.showSuccess(this.msg, "Delegado de Distrito Asignado Correctamente")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la :" + error)
      })
    }
    handleDelegado = (event) => { this.setState({ correoDelegado : event.target.value }) }
    handleDistrito = (evt) => {this.setState({ idDelDistrito : evt.target.value })}
    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Delegado de Distrito'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Delegado'
                        placeholder='Correo del Delegado'
                        value={this.state.correoDelegado}
                        onChange={this.handleDelegado.bind(this)}
                    />
                    <Form.Input
                        type="number"
                        label='Distrito'
                        placeholder="ID del Distrito"
                        value={this.state.idDelDistrito}
                        onChange={this.handleDistrito.bind(this)}
                    />
                    <Button onClick={this.handleSetDelegadoDeDistrito.bind(this)}>
                        Asignar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetDelegadoDeDistrito
