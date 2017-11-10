// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'

// Utils
// import contract from 'truffle-contract'
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
import LoadingComponent from '../utils/LoadingComponent.js'
// import CustomTable from '../utils/CustomTable.js'

// Contracts
// import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
// import DistritoContract from '../../build/contracts/Distrito.json'
// import EscuelaContract from '../../build/contracts/Escuela.json'
// import MesaContract from '../../build/contracts/Mesa.json'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class LoadMesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          candidatos : [],
          isMesaInvalid : false,
          loading : true
        }
        this.distrito = currentUser.getUser(cookie).distrito
        this.escuela = currentUser.getUser(cookie).escuela
        this.mesa = currentUser.getUser(cookie).mesa
    }

    componentWillMount() {
      if(currentUser.canLoadMesaUser(cookie)){
        console.log("buscando la mesa")
        api.getMesaUser(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then((res) => {
          console.log(res)
          this.setState({candidatos : res.data, loading : false})
        }).catch(error => {
          this.setState({isMesaInvalid : true, loading : false})
        })
      } else{
        this.setState({isMesaInvalid : true, loading : false})
      }
    }
    /////////////////////////////////////////////////////////////////////////////////
    handleCheckMesa = (event) => {
      event.preventDefault()
      api.checkMesa(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then(res => {
        console.log(res)
        utils.showSuccess(this.msg, "Validacion de votos correcto")
      }).catch(error => {
        utils.showError(this.msg, "Fallo en la validacion de votos")
      })
    }
    renderCanCheck(){
      if(currentUser.isPresidenteDeMesa(cookie)){
        return (
          <Button onClick={this.handleCheckMesa.bind(this)}>
          Validar conteo
          </Button>
        )
      } else {
        return null
      }
    }
    getMesaId = () => {
      return `${currentUser.getDistrito(cookie)}${currentUser.getEscuela(cookie)}${currentUser.getMesa(cookie)}`
    }
    ////////////////////////////////////////////////////////////////////////////////
    //Manejan los cambios en los conteos
    handleCandidatoCountsChange = (idx) => (evt) => {
      evt.preventDefault()
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    //carga los datos de un participante
    handleLoadMesa = (event) => {
      event.preventDefault()
      api.loadMesa(currentUser.getEmail(cookie), this.state.candidatos, this.distrito, this.escuela, this.mesa).then(res => {
        utils.showSuccess(this.msg, "Carga de datos correcta")
      }).catch(error => {
        utils.showError(this.msg, error.response.data)
      })
    }

    renderMesaLoadable(){
        return (
          <Container text>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Header as='h3'>Cargar Mesa: {this.getMesaId()}</Header>
              <Form>
                  <Header as='h3'>Candidatos</Header>
                  {
                    this.state.candidatos.map((candidato, idx) => (
                      <Form.Input
                        type='number'
                        key={idx}
                        label={`Candidato: ${candidato.name}`}
                        placeholder={`Candidato: ${idx + 1}`}
                        value={candidato.counts}
                        onChange={this.handleCandidatoCountsChange(idx)}
                      />
                    ))
                  }
                  <Button onClick={this.handleLoadMesa.bind(this)}>
                    Cargar Mesa
                  </Button>
              </Form>
              {this.renderCanCheck()}
          </Container>
        )
    }
    renderInvalidMesa(){
      return (
        <Container text>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> {this.getMesaId()} no corresponde a una mesa válida</Header>
          <Button onClick={event => {
            this.props.history.push("/mesas")
          }}> Volver a las mesas
          </Button>
        </Container>
      )
    }

    renderLoadingMesa() {
      return (
        <LoadingComponent/>
      )
    }

    render () {
      if(this.state.loading){
        return this.renderLoadingMesa();
      } else if(this.state.isMesaInvalid){
        return this.renderInvalidMesa();
      } else{
        return this.renderMesaLoadable();
      }
    }

}

export default withRouter(LoadMesa)
