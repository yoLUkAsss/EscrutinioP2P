import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import { Button, Form, Header, Container} from 'semantic-ui-react'

// import ComponentTitle from '../utils/ComponentTitle.js'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'

// import ElectionContract from '../../build/contracts/Election.json'
import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'
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
          mesaId : props.match.params.mesaId,
          currentMesaAddress : "",
          web3 : null
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.handleGetMesa(results.web3, this.props.match.params.mesaId)
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
      const mesa = contract(MesaContract)
      mesa.setProvider(this.state.web3.currentProvider)
      let fromObject
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
          utils.showError(this.msg, "Fallo en la carga de datos:" + error)
        })
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la carga de datos:" + error)
      }
    }

    //falta chequear que una vez validaron sus conteos no puede volver a cargar datos
    handleGetMesa = async (cweb3, mesaId) => {
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      mesaElectionCRUD.setProvider(cweb3.currentProvider)
      mesa.setProvider(cweb3.currentProvider)
      let fromObject
      cweb3.eth.getAccounts((error, accounts) => {
        fromObject = {from : accounts[0]}
      })
      try{
        let mesaCRUDInstance = await mesaElectionCRUD.deployed()
        let currentMesaAddress = await mesaCRUDInstance.getMesa.call(mesaId, fromObject)
        let mesaInstance = await mesa.at(currentMesaAddress)
        let candidates = await mesaInstance.getCandidatesList.call(fromObject)
        candidates = candidates.map(c => {return {name : cweb3.toAscii(c), counts : 0}})
        this.setState({candidatos : candidates, mesaAddress : currentMesaAddress})
      } catch(err){
        console.log(err)
      }
    }

    render () {
        return (
          <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Header as='h3'>Cargar Mesa: {this.state.mesaId}</Header>
              <Form onSubmit={this.handleLoadMesa.bind(this)}>
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
                  <Button>Cargar Mesa</Button>
              </Form>
          </Container>
        );
    }
}

export default Mesa
// <RefactoredDLF
//   title='Candidatos'
//   type='number'
//   placeholder='Nombre de Candidato'
//   onChange={this.handleNewCandidates}
//   items={this.state.candidatos}
// />
