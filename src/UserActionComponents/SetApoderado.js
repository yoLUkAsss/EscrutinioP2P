/**
 * React utilities
 */
import React, { Component } from 'react'
import { Header, Button, Form, Confirm} from 'semantic-ui-react'
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
            candidatos : [],
            open : false
        }
    }

    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    componentWillMount(){
      api.getCandidatos().then(res => {
        console.log(res.data)
        this.setState({candidatos : res.data.map((x, idX) => {return { key : idX, value : x, text : x}})})
      }).catch(error => {
        console.log(error)
      })
    }

    handleSetApoderado(event) {
      event.preventDefault()
      api.setApoderadoDePartido(currentUser.getEmail(cookie), this.state.email, this.state.candidato).then(res => {
        utils.showSuccess(this.msg, res.data)
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, error.response.data.message)
      })
      this.setState({open : false, email : "", candidato : ""})
    }

    handleCandidato = (event, {value}) => { this.setState({ candidato : value }) }
    handleApoderado = (event) => { this.setState({ email : event.target.value }) }
    render () {
        return (
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Header as='h2' textAlign='center'>Asignar Apoderado de Partido</Header>
                <Form>
                    <Form.Input
                        required
                        type="email"
                        label='Apoderado'
                        placeholder='Correo del Apoderado'
                        value={this.state.email}
                        onChange={this.handleApoderado.bind(this)}
                    />
                    <Form.Dropdown
                      required
                      label='Candidato'
                      placeholder='Partido Politico Asociado'
                      options={this.state.candidatos}
                      selection
                      onChange={this.handleCandidato.bind(this)}
                    />
                    <Button basic color="green" onClick={this.show.bind(this)}>Asignar</Button>
                    <Confirm
                      open={this.state.open}
                      header='Asignacion de Apoderado de Partido'
                      content={`Estas seguro de asignar al usuario: ${this.state.email}, como apoderado del candidato:  ${this.state.candidato}`}
                      onCancel={this.close.bind(this)}
                      onConfirm={this.handleSetApoderado.bind(this)}
                    />
                </Form>
            </div>
        );
    }
}

export default SetFiscal

// <Form.Input
//     required
//     type="text"
//     label='Candidato'
//     placeholder='Partido Policito asociado'
//     value={this.state.candidato}
//     onChange={this.handleCandidato.bind(this)}
// />
