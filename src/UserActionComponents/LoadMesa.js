// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Divider, Loader, Popup, Modal, Dimmer} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'

import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'
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
          loadingCM : false,
          isLoadInvalid : false,
          total : 0,

          modalOpen : false,
          loadingCheck : false,
          toValidate : []
        }
        this.distrito = currentUser.getUser(cookie).distrito
        this.escuela = currentUser.getUser(cookie).escuela
        this.mesa = currentUser.getUser(cookie).mesa

        this.handleLoadMesa = this.handleLoadMesa.bind(this)
        this.handleCandidatoCountsChange = this.handleCandidatoCountsChange.bind(this)
        // this.handleCandidatoCountsChange = this.handleCandidatoCountsChange.bind(this)
    }

    componentWillMount() {
      if(currentUser.canLoadMesaUser(cookie)){
        api.getMesaParticipants(this.distrito, this.escuela, this.mesa).then((res) => {
          let candidates2load = []
          let newparticipants = []
          res.data.participants.forEach(x => {
            if(x.name === currentUser.getEmail(cookie)){
              candidates2load = x.candidates
            } else {
              newparticipants.push(x)
            }
          })
          this.setState({
            participants : newparticipants,
            loading : false,
            candidates : candidates2load,
            total : res.data.total})
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
      if(currentUser.isPresidenteDeMesa(cookie)){
        api.checkMesa(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then(res => {
          utils.showSuccess(this.msg, res.data)
          this.setState({loadingCheck : false, modalOpen : false})
        }).catch(error => {
          utils.showError(this.msg, error.response.data)
          this.setState({loadingCheck : false, modalOpen : false})
        })
      } else{
        api.checkMesaFiscal(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then(res => {
          utils.showSuccess(this.msg, res.data)
          this.setState({loadingCheck : false, modalOpen : false})
        }).catch(error => {
          utils.showError(this.msg, error.response.data)
          this.setState({loadingCheck : false, modalOpen : false})
        })
      }
      this.setState({loadingCheck : true})
    }
    handleModalCheckMesa = (event) => {
      api.getMesaUser(currentUser.getEmail(cookie), this.distrito, this.escuela, this.mesa).then(res => {
        this.setState({loadingCheck : false, toValidate : res.data})
      }).catch(error => {
        this.setState({loadingCheck : false, modalOpen : false})
      })
      this.setState({loadingCheck : true, modalOpen : true})
    }
    handleModalClose = () => {
      this.setState({modalOpen : false})
    }
    renderCanCheck(){
        return (
          <Modal
            trigger={
              <Button basic color="green" onClick={this.handleModalCheckMesa.bind(this)}>
                Validar conteo
              </Button>
            }
            open={this.state.modalOpen}
            >
            <Modal.Header content={<Header as='h3' textAlign='center' content='Planilla a validar'/>}/>
            <Modal.Content>
              {
                this.state.loadingCheck ? (<Dimmer active={this.state.modalOpen} inverted><Loader size='small' content='Loading' active inline='centered'/></Dimmer>) : <CustomTable itemsHeader={["Candidato","Conteo"]} itemsBody={this.state.toValidate}/>
              }

            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.handleModalClose.bind(this)}>
                Cerrar
              </Button>
              <Button basic color="green" onClick={this.handleCheckMesa.bind(this)}>
                Validar conteo
              </Button>
            </Modal.Actions>
          </Modal>
        )
    }
    // this.state.loadingCheck ? <Loader size='massive' content='Loading' active inline='centered'/> : <p>Hola</p>


    getMesaId = () => {
      return `${currentUser.getDistrito(cookie)}${currentUser.getEscuela(cookie)}${currentUser.getMesa(cookie)}`
    }
    ////////////////////////////////////////////////////////////////////////////////
    //Manejan los cambios en los conteos
    handleCandidatoCountsChange = (idx) => (evt) => {
      evt.preventDefault()
      const isNumber = /^[0-9\b]+$/
      if(isNumber.test(evt.target.value) || evt.target.value === ''){
        const newCandidatos = this.state.candidates.map((candidato, pidx) => {
          if (idx !== pidx) return candidato
          return { ...candidato, counts: evt.target.value }
        })
        const someEmpty = newCandidatos.some((elem, i, arr) => { return elem.counts === '' })
        if(someEmpty){
          this.setState({ candidates: newCandidatos, isLoadInvalid : true})
        } else {
          this.setState({ candidates: newCandidatos, isLoadInvalid : false})
        }
      }
    }
    //carga los datos de un participante
    handleLoadMesa = (event) => {
      event.preventDefault()
      //check inputs are not ''
      api.loadMesa(currentUser.getEmail(cookie), this.state.candidates, this.distrito, this.escuela, this.mesa).then(res => {
        this.setState({ loadingCM : false })
        utils.showSuccess(this.msg, res.data)
      }).catch(error => {
        this.setState({loadingCM : false})
        utils.showError(this.msg, error.response.data)
      })
      this.setState({loadingCM : true})
    }

    renderMesaLoadable(){
        return (
          <div>
            <Header as='h3' textAlign='center'>
              Cargar {'<'}Mesa: {this.mesa}{'>'}{'<'}Escuela: {this.escuela}{'>'}{'<'}Distrito: {this.distrito}{'>'}
              <Header.Subheader>
                Hay {this.state.total} personas en esta mesa
              </Header.Subheader>
            </Header>
            {this.state.loadingCM ? <Loader active inline='centered'/> : null}
            {this.renderLoadUser()}
            {this.renderCanCheck()}
            <Divider/>
            {
              this.renderParticipants()
            }
          </div>
        )
    }
    renderInvalidMesa(){
      return (
        <div>
          <Header as='h3' textAlign='center'> {this.getMesaId()} no corresponde a una mesa válida</Header>
          <Button basic onClick={event => {
            this.props.history.push("/mesas")
          }}> Volver a las mesas
          </Button>
        </div>
      )
    }
    renderParticipants(){
      return (
        <div>
          {
            this.state.participants.map((x, idX) => {
              return (
                <div key={idX}>
                  <Header as='h3' textAlign='center'>Conteo del candidato: {x.name}</Header>
                  <CustomTable key={idX} itemsHeader={["Candidato","Conteo"]} itemsBody={x.candidates} color={x.checked ? 'green' : 'red'}/>
                  <Divider/>
                </div>
              )
            })
          }
        </div>
      )
    }
    renderLoadUser(){
      return (
        <Form>
          {
            this.state.candidates.map((candidate, idx) => (
            <Form.Input
              key={idx}
              input="text"
              label={`Candidato: ${candidate.name}`}
              placeholder={`Candidato: ${idx + 1}`}
              value={candidate.counts}
              onChange={this.handleCandidatoCountsChange(idx)}
            />
            ))
          }
          <Button basic color="green" onClick={this.handleLoadMesa} disabled={this.state.isLoadInvalid} content="Cargar Mesa"/>
        </Form>
      )
    }
    //ui.button.disabled.pointer-events-enabled{pointer-event: auto!important;}
    // <Popup content={this.state.isLoadInvalid ? "Completa los campos" : "Confirma el registro"}
    //   trigger={<Button basic color="green" className='pointer-events-enabled' onClick={this.handleLoadMesa} disabled={this.state.isLoadInvalid} content="Cargar Mesa"/>}
    // />

    render () {
      let toRender = null
      if(this.state.loading){
        toRender = <Loader size='massive' content='Loading' active inline='centered'/>
      }else if(this.state.isMesaInvalid){
        toRender = this.renderInvalidMesa()
      } else{
        toRender = this.renderMesaLoadable()
      }
      return (
        <div>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          {toRender}
        </div>
      )
    }

}

export default withRouter(LoadMesa)
