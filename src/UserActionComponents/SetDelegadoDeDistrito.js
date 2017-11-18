/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Header, Button,  Form, Confirm} from 'semantic-ui-react'
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

class SetDelegadoDeDistrito extends Component {
    constructor() {
        super()
        this.state = {
            correoDelegado : "",
            distrito : "",
            distritos : [],
            open : false
        }
    }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    componentWillMount(){
      api.getDistritos().then(res => {
        this.setState({distritos : res.data.map((x, idX) => {return { key : idX, value : x, text : x}})})
      }).catch(error => {
        console.log(error)
      })
    }

    handleSetDelegadoDeDistrito(event) {
      event.preventDefault()
      api.setDelegadoDeDistrito(currentUser.getEmail(cookie), this.state.correoDelegado, this.state.distrito).then(res => {
        utils.showSuccess(this.msg, "Delegado de Distrito Asignado Correctamente")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, error.response.data.message)
      })
      this.setState({open : false, correoDelegado : "", distrito : ""})
    }
    handleDelegado = (event) => { this.setState({ correoDelegado : event.target.value }) }
    handleDistrito = (e, { value }) => { this.setState({ distrito : value }) }
    render () {
        return (
            <Container text>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Header as='h2' color='teal' textAlign='center'>Asignar Delegado de Distrito</Header>
                <Form>
                    <Form.Input
                      required
                      type="email"
                      label='Delegado'
                      placeholder='Correo del Delegado'
                      value={this.state.correoDelegado}
                      onChange={this.handleDelegado.bind(this)}
                    />
                    <Form.Dropdown
                      required
                      label='ID del Distrito'
                      placeholder='Distrito'
                      options={this.state.distritos}
                      selection
                      onChange={this.handleDistrito.bind(this)}
                    />
                    <Button basic color="green" onClick={this.show.bind(this)}>Asignar</Button>
                    <Confirm
                      open={this.state.open}
                      header='Asignacion de Delegado de Distrito'
                      content={`Estas seguro de asignar al usuario: ${this.state.correoDelegado}, como delegado del distrito: ${this.state.distrito}`}
                      onCancel={this.close.bind(this)}
                      onConfirm={this.handleSetDelegadoDeDistrito.bind(this)}
                    />
                </Form>
            </Container>
        );
    }
}

export default SetDelegadoDeDistrito
// <Form.Input
//   required
//   type="number"
//   label='ID del Distrito'
//   placeholder='ID del Distrito'
//   value={this.state.distrito}
//   onChange={this.handleDistrito.bind(this)
//   }
// />
// <Form.Field
//   control='input'
//   min={1}
//   required
//   type='number'
//   label='ID del Distrito'
//   placeholder='ID del Distrito'
//   value={this.state.distrito}
//   onChange={this.handleDistrito.bind(this)}
// />
