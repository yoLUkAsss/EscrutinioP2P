import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Form, Divider, Header, Table } from 'semantic-ui-react'

class SearchMesaForm extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          nombreParticipante : '',
          nombreCandidato : '',
          mesaAddress : '',

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

    buscarConteoDeUnParticipante = (event) => {
        event.preventDefault()
        var mesaInstance
        const mesa = contract(MesaContract)
        var mapped = []
        var promises = []
        let res = new Map()
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          mesa.at(this.state.mesaAddress).then((mInstance) => {
            mesaInstance = mInstance
            return mesaInstance.getCandidates.call({from : accounts[0]})
          }).then((list) => {
              //this.state.web3.toAscii(x)
              //this.state.web3.toAscii(x)
              mapped = list.map(x => {return this.state.web3.toAscii(x)})
              this.setState({candidatos : mapped})
              promises = mapped.map(candidato => {
                return mesaInstance.getParticipantVotesForACandidate.call(this.state.nombreParticipante, candidato,{from : accounts[0]})
              })
          }).then(() => {
            Promise.all(promises).then(function(data){
              for(var i = 0; i < data.length; i++){
                console.log(mapped[i].length)
                for(var j=0;j < mapped[i].length; j++){
                  var ss = mapped[i][j].replace(/^[a-z0-9]+$/i)
                  if(ss !== ''){
                    console.log(ss)
                  }
                }
                res.set(mapped[i], data[i].toNumber())
              }
              console.log(res)
              console.log("Antes de asignar map")

              this.setState({conteos : res})
            }).catch(reason => {
              console.log(reason)
            })
          })
        })
        console.log(this.state.conteos)

    }

    render() {
        return (
          <div>
            <Form onSubmit={this.buscarConteoDeUnParticipante.bind(this)}>
                <Header as='h3'> Buscar conteo de un participante</Header>
                <Form.Group>
                  <Form.Input
                      type="text"
                      label='Direccion de la mesa'
                      placeholder="Direccion de mesa"
                      value={this.state.mesaAddress}
                      onChange={(evt) => {this.setState({ mesaAddress : evt.target.value })}}
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

export default SearchMesaForm
