import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Form, Divider, Header, Table } from 'semantic-ui-react'

import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

import * as utils from '../utils/utils.js'
// import AlertContainer from 'react-alert'

class GetMesa extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          mesaId : '',
          mesaInfo : {
            fiscales : [],
            presidente : "",
            vicepresidente : ""
          }
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

    handleGetMesa = async (event) => {
      event.preventDefault()

      let candidates = []
      let presidente = ""
      let vicepresidente = ""
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      mesa.setProvider(this.state.web3.currentProvider)
      let fromObject
      await this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from: accs[0]}
      })
      let CRUDinstance = await mesaElectionCRUD.deployed()
      let mesaInstance = await CRUDinstance.getMesa.call(this.state.mesaId, fromObject).then((mesaAddress) => {
        return mesa.at(mesaAddress)
      })
      candidates = await mesaInstance.getCandidatesList.call(fromObject)
      candidates = candidates.map(x => {return this.state.web3.toAscii(x)})
      presidente = await mesaInstance.presidenteMesa.call(fromObject)
      presidente = this.state.web3.toAscii(presidente)
      vicepresidente = await mesaInstance.presidenteMesa.call(fromObject)
      vicepresidente = this.state.web3.toAscii(vicepresidente)

      console.log(candidates)
      console.log(presidente)
      console.log(vicepresidente)

    }

    //this.state.web3.toAscii(x)
    buscarConteoDeUnParticipante = (event) => {
        event.preventDefault()
        var mapped = []
        var promises = []
        var res = new Map()
        const realThis = this
        const mesaElectionCRUD = contract(MesaElectionCRUDContract)
        const mesa = contract(MesaContract)
        let mesaInstance
        mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
            mesaElectionCRUD.deployed().then((CRUDinstance) => {
                return CRUDinstance.getMesa.call(this.state.mesaId, {from:accounts[0]})
            }).then((mesaAddress) => {
                return mesa.at(mesaAddress)
            }).then((minstance) => {
                mesaInstance = minstance
                return mesaInstance.getCandidatesList.call({from:accounts[0]})
            }).then((allCandidates) => {
                mapped = allCandidates.map((x) => {
                    return this.state.web3.toAscii(x)
                })
                promises = mapped.map((candidato) => {
                    return mesaInstance.getParticipantVotesForACandidate.call(this.state.nombreParticipante, candidato, {from : accounts[0]})
                })
            }).then(() => {
                Promise.all(promises).then(function(data){
                    for(var i = 0; i < data.length; i++){
                        res.set(realThis.state.web3.toAscii(data[i][0]), data[i][1].toNumber())
                    }
                  realThis.setState({conteos : res, candidatos : mapped})
                  utils.showSuccess(this.msg, "Creacion de mesa exitoso")
                }).catch(reason => {
                  utils.showError(this.msg, "Fallo en la creacion de mesa")
                })
            })
        })
    }

    render() {
        return (
          <div>
            <Header as='h2'> Ver informacion de una mesa</Header>
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
          <Divider section />
            <Header as='h3'> Conteo de un participante</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                  {this.state.candidatos.map((item, id) => (
                    <Table.HeaderCell>{item}</Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.state.nombreParticipante}</Table.Cell>
                  {this.state.candidatos.map((item, id) => (
                    <Table.HeaderCell>{this.state.conteos.get(item)}</Table.HeaderCell>
                  ))}
                </Table.Row>
                </Table.Body>
            </Table>
          </div>
        )
    }
}

export default GetMesa
