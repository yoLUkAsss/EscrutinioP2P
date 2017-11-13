// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Container, Divider} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'

import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
import LoadingComponent from '../utils/LoadingComponent.js'
import CustomTable from '../utils/CustomTable.js'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class LoadMesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          participants : [],
          isMesaInvalid : false,
          loading : true,
          candidates : [],
          loadingCM : false
        }
        this.distrito = currentUser.getUser(cookie).distrito
        this.escuela = currentUser.getUser(cookie).escuela
        this.mesa = currentUser.getUser(cookie).mesa
    }

    componentWillMount() {
      if(currentUser.canLoadMesaUser(cookie)){
        api.getMesaParticipants(this.distrito, this.escuela, this.mesa).then((res) => {
          let candidates2load = []
          let newparticipants = []
          res.data.forEach(x => {
            if(x.name === currentUser.getEmail(cookie)){
              candidates2load = x.candidates
            } else {
              newparticipants.push(x)
            }
          })
          this.setState({participants : newparticipants, loading : false, candidates : candidates2load})
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
      this.setState({ loading: true })
      api.checkMesa(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then(res => {
<<<<<<< HEAD
        console.log(res)
        this.setState({ loading: false })
=======
>>>>>>> c367d427ae06b63bb06883a4018498f8d4ab07ae
        utils.showSuccess(this.msg, "Validacion de votos correcto")
        this.setState({loadingCM : false})
      }).catch(error => {
<<<<<<< HEAD
        utils.showError(this.msg, error.response.data)
=======
        this.setState({loadingCM : false})
        utils.showError(this.msg, "Fallo en la validacion de votos")
>>>>>>> c367d427ae06b63bb06883a4018498f8d4ab07ae
      })
      this.setState({loadingCM : true})
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
      const newCandidatos = this.state.candidates.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidates: newCandidatos})
    }
    //carga los datos de un participante
    handleLoadMesa = (event) => {
      event.preventDefault()
      this.setState({ loading: true })
      api.loadMesa(currentUser.getEmail(cookie), this.state.candidates, this.distrito, this.escuela, this.mesa).then(res => {
<<<<<<< HEAD
        this.setState({ loading : false })
=======
        this.setState({loadingCM : false})
>>>>>>> c367d427ae06b63bb06883a4018498f8d4ab07ae
        utils.showSuccess(this.msg, "Carga de datos correcta")
      }).catch(error => {
        this.setState({loadingCM : false})
        utils.showError(this.msg, error.response.data)
      })
      this.setState({loadingCM : true})
    }

    renderMesaLoadable(){
        return (
          <Container text>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            {this.state.loadingCM ? (<LoadingComponent active={this.state.loadingCM}/>) : (null)}
            <Header as='h3'>Cargar Mesa: {this.getMesaId()}</Header>
              {this.renderLoadUser()}
              {this.renderCanCheck()}
              <Divider/>
              {
                this.renderParticipants()
              }
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
    renderParticipants(){
      return (
        <Container text>
          {
            this.state.participants.map((x, idX) => {
              return (
                <div key={idX}>
                  <Header as='h2'>{x.name}</Header>
                  <CustomTable key={idX} itemsHeader={["Candidato","Conteo"]} itemsBody={x.candidates}/>
                  <Divider/>
                </div>
              )
            })
          }
        </Container>
      )
    }
    renderLoadUser(){
      return (
        <Form>
          {
            this.state.candidates.map((candidate, idx) => (
            <Form.Input
              type='number'
              key={idx}
              label={`Candidato: ${candidate.name}`}
              placeholder={`Candidato: ${idx + 1}`}
              value={candidate.counts}
              onChange={this.handleCandidatoCountsChange(idx)}
            />
            ))
          }
          <Button onClick={this.handleLoadMesa.bind(this)}>
            Cargar Mesa
          </Button>
        </Form>
      )
    }

    render () {
      if(this.state.loading){
        return (<LoadingComponent active={this.state.loading}/>);
      }else if(this.state.isMesaInvalid){
        return this.renderInvalidMesa();
      } else{
        return this.renderMesaLoadable();
      }
    }

}

export default withRouter(LoadMesa)
