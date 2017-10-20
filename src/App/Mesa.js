// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'

// Utils
import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'

// Contracts
import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
import DistritoContract from '../../build/contracts/Distrito.json'
import MesaCRUDContract from '../../build/contracts/MesaCRUD.json'
import MesaContract from '../../build/contracts/Mesa.json'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class Mesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          candidatos : [],
          mesaAddress : "",
          isMesaInvalid : false,
          web3 : null
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.handleGetMesa(results.web3, this.props.distritoId, this.props.escuelaId, this.props.match.params.mesaId)
        this.setState({
          web3: results.web3
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
    }

    ////////////////////////////////////////////////////////////////////////////////
    //Manejan los cambios en los conteos
    handleCandidatoCountsChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    ////////////////////////////////////////////////////////////////////////////////

    //carga los datos de un participante
    handleLoadMesa = async (event) => {
      event.preventDefault()
      let fromObject
      const mesa = contract(MesaContract)
      mesa.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        fromObject = {from : accounts[0], gas : 3000000}
      })
      try{
        let mesaInstance = await mesa.at(this.state.mesaAddress)
        let promises = this.state.candidatos.map(c => {
          return mesaInstance.loadVotesForParticipant.sendTransaction(currentUser.getEmail(cookie), c.name, c.counts, fromObject)
        })
        Promise.all(promises).then(() => {
          utils.showSuccess(this.msg, "Carga de datos correcta")
        }).catch(error => {
          utils.showError(this.msg, "Fallo en la carga de datos1:" + error)
        })
      } catch(error){
        utils.showError(this.msg, "Fallo en la carga de datos2:" + error)
      }
    }

    //falta chequear que una vez validaron sus conteos no puede volver a cargar datos
    handleGetMesa = async (cweb3, distritoId, escuelaId, mesaId) => {
      const distritoCRUD = contract(DistritoCRUDContract)
      const distrito = contract(DistritoContract)
      const mesaCRUD = contract(MesaCRUDContract)
      const mesa = contract(MesaContract)
      distritoCRUD.setProvider(cweb3.currentProvider)
      distrito.setProvider(cweb3.currentProvider)
      mesaCRUD.setProvider(cweb3.currentProvider)
      mesa.setProvider(cweb3.currentProvider)
      let fromObject
      cweb3.eth.getAccounts((error, accounts) => {
        fromObject = {from : accounts[0]}
      })
      try{
        let distritoCRUDInstance = await distritoCRUD.deployed()
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(distritoId, fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let mesaCRUDAddress = await distritoInstance.getMesaCRUD.call(escuelaId, fromObject)
        let mesaCRUDInstance = await mesaCRUD.at(mesaCRUDAddress)
        let newMesaAddress = await mesaCRUDInstance.getMesa.call(mesaId, fromObject)
        let mesaInstance = await mesa.at(newMesaAddress)
        let candidatesList = await mesaInstance.getCandidatesList.call(fromObject)
        let candidates = []
        let isValidParticipant = await mesaInstance.isValidParticipant.call(currentUser.getEmail(cookie), fromObject)
        let promises
        if(isValidParticipant){
          promises = candidatesList.map(c => {
            return mesaInstance.getParticipantVotesForACandidate.call(currentUser.getEmail(cookie), cweb3.toAscii(c), fromObject)
          })
        } else {
          promises = candidatesList.map(c => {
            return mesaInstance.getTotal.call(cweb3.toAscii(c), fromObject)
          })
        }
        Promise.all(promises).then((results) => {
          for(const res of results){
            candidates.push({"name" : cweb3.toAscii(res[0]), "counts" : res[1].toNumber()})
          }
          this.setState({candidatos : candidates, mesaAddress : newMesaAddress})
          utils.showSuccess(this.msg, "Conteo total de mesa cargado correctamente")
        }).catch(error => {
          utils.showError(this.msg, "Fallo en la carga de datos:" + error)
        })
      } catch(err){
        this.setState({isMesaInvalid : true})
      }
    }

    renderValidMesa(){
      return (
        <Container>
        <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'>Cargar Mesa: {this.state.mesaId}</Header>
            <Form>
                <Header as='h3'>Candidatos</Header>
                {this.state.candidatos.map((candidato, idx) => (
                  <Form.Input
                    type='number'
                    key={idx}
                    label={`Candidato: ${candidato.name}`}
                    placeholder={`Candidato: ${idx + 1}`}
                    value={candidato.counts}
                    onChange={this.handleCandidatoCountsChange(idx)}
                  />
                ))}
                <Button onClick={this.handleLoadMesa.bind(this)}>
                  Cargar Mesa
                </Button>
            </Form>
        </Container>
      );
    }

    renderInvalidMesa(){
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> Mesa no valida</Header>
          <Button onClick={event => {
            this.props.history.push("/mesas")
          }}> Volver a las mesas
          </Button>
        </Container>
      )
    }

    render () {
        if(this.state.isMesaInvalid){
          return this.renderInvalidMesa();
        } else{
          return this.renderValidMesa();
        }
    }
}

export default withRouter(Mesa)
// <RefactoredDLF
//   title='Candidatos'
//   type='number'
//   placeholder='Nombre de Candidato'
//   onChange={this.handleNewCandidates}
//   items={this.state.candidatos}
// />


// let promises = candidatesList.map(async c => {
//   let currentCandidate = cweb3.toAscii(c)
//   if (isParticipant) {
//     console.log("Participante valido")
//     let result = await mesaInstance.getParticipantVotesForACandidate.call(currentUser.getEmail(cookie), currentCandidate, fromObject)
//     count = result[1]
//   } else {
//     console.log("Participante no valido")
//     count = await mesaInstance.getTotal.call(currentCandidate, fromObject)
//   }
//   candidates.push({"name" : currentCandidate,"counts" : count})
//   return {"name" : cweb3.toAscii(c),"counts" : count}
// })
// Promise.all(promises).then(() => {
//   utils.showSuccess(this.msg, "Conteo total de mesa cargado correctamente")
//   this.setState({
//     candidatos : candidates,
//     mesaAddress : currentMesaAddress
//   })
// }).catch(error => {
//   utils.showError(this.msg, "Fallo en la carga de datos:" + error)
// })
