import React, { Component } from 'react'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Table, Container, Divider, Header, Button} from 'semantic-ui-react'
import AlertContainer from 'react-alert'
import ComponentTitle from '../utils/ComponentTitle.js'
import * as utils from '../utils/utils.js'

import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

class Mesas extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          mesaId : 0,
          conteos : new Map(),
          candidatos : []
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.handleGetPartialResults(results.web3)
        this.setState({web3 : results.web3})
      }).catch(() => {
          console.log('Error finding web3.')
      })
    }

    handleGetPartialResults = async (someWeb3) => {
      const mesaCRUD = contract(MesaElectionCRUDContract)
      mesaCRUD.setProvider(someWeb3.currentProvider)
      let res = new Map()
      let realThis = this
      let fromObject
      let candidates = []
      someWeb3.eth.getAccounts((err, accounts) => {
        fromObject = {from : accounts[0]}
      })
      let mesaCRUDInstance = await mesaCRUD.deployed()
      candidates = await mesaCRUDInstance.getCandidates.call(fromObject)
      candidates = candidates.map(c => { return someWeb3.toAscii(c)})
      let promises = candidates.map(candidate => {
        return mesaCRUDInstance.getCounts.call(candidate, fromObject)
      })
      Promise.all(promises).then(function(data){
        data.forEach(d => {
          res.set(someWeb3.toAscii(d[0]), d[1].toNumber())
        })
          realThis.setState({conteos : res, candidatos : candidates})
      }).catch(reason => {
          console.log(reason)
      })
    }

    handleCreateMesa = async (event) => {
      event.preventDefault()
      const mesaCRUD = contract(MesaElectionCRUDContract)
      mesaCRUD.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accounts) => {
        fromObject = {from : accounts[0], gas : 3000000}
      })
      try{
        let mesaCRUDInstance = await mesaCRUD.deployed()
        await mesaCRUDInstance.createMesaElection.sendTransaction(fromObject)
        utils.showSuccess(this.msg, "Creacion de mesa exitoso")
      } catch(err){
        console.log(err)
        utils.showError(this.msg, "Fallo en la creacion de mesa")
      }
    }

    render() {
        return (
          <div>
          <Container>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <ComponentTitle title="Resultados parciales de estas mesas"/>
            <Table>
              <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Candidato</Table.HeaderCell>
                  {this.state.candidatos.map((item, id) =>
                      (<Table.HeaderCell key={id}>{item}</Table.HeaderCell>)
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Conteo parcial</Table.Cell>
                  {this.state.candidatos.map((item, id) =>
                    (<Table.HeaderCell key={id}>{this.state.conteos.get(item)}</Table.HeaderCell>)
                  )}
                </Table.Row>
                </Table.Body>
            </Table>
          </Container>
          </div>
        )
    }
}
export default Mesas
