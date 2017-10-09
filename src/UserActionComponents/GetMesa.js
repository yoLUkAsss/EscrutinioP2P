import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Form, Divider, Header, Table } from 'semantic-ui-react'

import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

class GetMesa extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          nombreParticipante : '',
          nombreCandidato : '',
          mesaId : '',

          conteos : new Map(),
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
                }).catch(reason => {
                    console.log(reason)
                })
            })
        })
    }

    render() {
        return (
          <div>
            <Header as='h2'> Buscar conteo de un participante</Header>
            <Form onSubmit={this.buscarConteoDeUnParticipante.bind(this)}>
                <Header as='h3'> Buscar conteo de un participante</Header>
                <Form.Group>
                  <Form.Input
                      type="number"
                      label='id de la Mesa'
                      placeholder="id de la Mesa"
                      value={this.state.mesaId}
                      onChange={(evt) => {this.setState({ mesaId : evt.target.value })}}
                  />
                  <Form.Input
                      type="text"
                      label='Nombre del participante'
                      placeholder="Nombre del participante"
                      value={this.state.nombreParticipante}
                      onChange={(evt) => {this.setState({ nombreParticipante : evt.target.value })}}
                  />
                </Form.Group>
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
