import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Form, Divider, Header, Button, Container} from 'semantic-ui-react'
import AlertContainer from 'react-alert'
import cookie from 'react-cookies'

import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'

class SearchMesa extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          mesaId : '',
          candidatos : []
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            })
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }
    ////////////////////////////////////////////////////////////////////////////////
    //Manejan los cambios del nomre de participante y de la mesa y de los conteos
    handleMesaId = (evt) => {
      this.setState({mesaId : evt.target.value})
    }
    handleCandidatoCountsChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    ////////////////////////////////////////////////////////////////////////////////
    handleGetMesa = async (event) => {
      //let [foo, bar] = await Promise.all([getFoo(), getBar()]);
      event.preventDefault()
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      mesa.setProvider(this.state.web3.currentProvider)
      let fromObject
      await this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from: accs[0]}
      })
      try{
        let CRUDinstance = await mesaElectionCRUD.deployed()
        let mesaAddress = await CRUDinstance.getMesa.call(this.state.mesaId, fromObject)
        let mesaInstance = await mesa.at(mesaAddress)
        let newCandidates = await mesaInstance.getCandidatesList.call(fromObject)
        this.setState({candidatos : newCandidates.map(x =>
          {
            return {name : this.state.web3.toAscii(x), counts : 0}
          })
        })
        utils.showSuccess(this.msg, "Busqueda de la mesa exitoso")
      } catch(err){
        console.log(err)
        utils.showError(this.msg, "Fallo en la busqueda de la mesa")
      }
    }

    handleLoadMesa = async (event) => {
      event.preventDefault()
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      mesa.setProvider(this.state.web3.currentProvider)
      let fromObject
      await this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from: accs[0]}
      })
      try{
        let CRUDinstance = await mesaElectionCRUD.deployed()
        let mesaInstance = await CRUDinstance.getMesa.call(this.state.mesaId, fromObject).then((mesaAddress) => {
          return mesa.at(mesaAddress)
        })
      } catch(err){
        utils.showError(this.msg, "Fallo en la busqueda de la mesa")
      }
      fromObject.gas = 3000000
      try{
        await this.state.candidatos.forEach((candidato, idC) => {
          mesaInstance.loadVotesForParticipant.sendTransaction(currentUser.getEmail(cookie), candidato.name, candidato.counts, fromObject)
        })
        utils.showSuccess(this.msg, "Carga de la mesa exitoso")
      } catch(err){
        console.log(err)
        utils.showError(this.msg, "Fallo en la carga de la mesa")
      }
    }

    render() {
        return (
          <div>
            <Container>
              <Header as='h2'> Ver informacion de una mesa</Header>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
              <Form onSubmit={this.handleGetMesa.bind(this)}>
                  <Header as='h3'> Ver Informacion de una mesa</Header>
                    <Form.Input
                        type="number"
                        label='id de la Mesa'
                        placeholder="id de la Mesa"
                        value={this.state.mesaId}
                        onChange={(evt) => {this.setState({ mesaId : evt.target.value })}}
                    />
                  <Form.Button content='Buscar'/>
              </Form>
              <Divider/>
              <Header as='h3'>Cargar Mesa {this.state.mesaId}</Header>
              <Form onSubmit={this.handleLoadMesa}>
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
          </div>
        )
    }
}

export default SearchMesa
// <Divider />
