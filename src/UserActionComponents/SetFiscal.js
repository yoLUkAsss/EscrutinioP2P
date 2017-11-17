/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Header, Form, Confirm, Loader } from 'semantic-ui-react'
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
          mesas : [],
          distritos : [],
          escuelas : [],
          open : false,
          loadingEscuelas : false,
          loadingMesas : false,
        }
    }
    componentWillMount(){
      api.getDistritos().then(resDistritos => {
        this.setState({
          distritos : resDistritos.data.map((x, idX) => {return { key : idX, value : x, text : x}})
        })
      }).catch(error => {
        console.log(error)
      })
    }

    handleSetFiscal(event) {
      event.preventDefault()
      api.setFiscal(currentUser.getEmail(cookie), this.state.candidato, this.state.email, this.state.distrito, this.state.escuela, this.state.mesa).then(res => {
        utils.showSuccess(this.msg, "Fiscal Asignado")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, error.response.data.message)
      })
      this.setState({open : false, email : "", candidato : "", distrito : "", escuela : "", mesa : ""})
    }

    handleFiscal = (event) => { this.setState({ email : event.target.value }) }
    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleDistrito = (event, {value}) => {
      api.getEscuelas(value).then(res => {
        this.setState({
          distrito : value,
          escuelas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingEscuelas : false
        })
      }).catch(error => {
        console.log("something failed")
        this.setState({loadingEscuelas : false})
      })
      this.setState({loadingEscuelas : true, escuelas : [], mesas : []})
    }
    handleEscuela = (event, {value}) => {
      api.getMesas(this.state.distrito, value).then(res => {
        this.setState({
          escuela : value ,
          mesas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingMesas : false,
        })
      }).catch(error => {
        console.log("something failed")
        this.setState({loadingMesas : false})
      })
      this.setState({loadingMesas : true, mesas : []})
    }
    handleMesa = (event, {value}) => { this.setState({ mesa : value }) }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    renderEscuelas(){
      return (
        <Form.Dropdown
          required
          label='ID de la Escuela'
          placeholder='Escuela'
          options={this.state.escuelas}
          selection
          onChange={this.handleEscuela.bind(this)}
          />
        )
    }
    renderMesas(){
      return (
        <Form.Dropdown
          required
          label='ID de la Mesa'
          placeholder='Mesa'
          options={this.state.mesas}
          selection
          onChange={this.handleMesa.bind(this)}
        />
      )
    }
    render () {
        return (
            <Container text>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Header as='h2' color='teal' textAlign='center'>Asignar Fiscal a una Mesa</Header>
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
                  <Form.Dropdown
                    required
                    label='ID del Distrito'
                    placeholder='Distrito'
                    options={this.state.distritos}
                    selection
                    onChange={this.handleDistrito.bind(this)}
                  />
                  {this.state.escuelas.length !== 0 ? this.renderEscuelas() : (this.state.loadingEscuelas ? <Loader active inline='centered'/> : null)}
                  {this.state.mesas.length !== 0 ? this.renderMesas() : (this.state.loadingMesas ? <Loader active inline='centered'/> : null)}
                  <Button onClick={this.show.bind(this)}>Asignar</Button>
                  <Confirm
                    open={this.state.open}
                    header='Asignacion de Fiscal de Mesa'
                    content={`Estas seguro de asignar al usuario: ${this.state.email}, como fiscal de la mesa:  ${this.state.mesa} de la escuela: ${this.state.escuela} del distrito: ${this.state.distrito}, para el candidato: ${this.state.candidato}`}
                    onCancel={this.close.bind(this)}
                    onConfirm={this.handleSetFiscal.bind(this)}
                  />
              </Form>
            </Container>
        );
    }
}

export default SetFiscal
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
// <Form.Field
//   control='input'
//   min={1}
//   required
//   type='number'
//   label='ID de la Escuela'
//   placeholder='ID de la Escuela'
//   value={this.state.escuela}
//   onChange={this.handleEscuela.bind(this)}
// />
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
