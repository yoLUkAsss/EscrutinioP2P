import React, { Component } from 'react'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Table, Container} from 'semantic-ui-react'
import AlertContainer from 'react-alert'
import ComponentTitle from '../utils/ComponentTitle.js'
import * as utils from '../utils/utils.js'

import ElectionContract from '../../build/contracts/Election.json'
import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
import DistritoContract from '../../build/contracts/Distrito.json'
import EscuelaContract from '../../build/contracts/Escuela.json'
import MesaContract from '../../build/contracts/Mesa.json'

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
        this.handleGetPartialResults(results.web3, this.props.distritoId, this.props.escuelaId)
        this.setState({web3 : results.web3})
      }).catch(() => {
          console.log('Error finding web3.')
      })
    }

    handleGetPartialResults = async (someWeb3, distritoId, escuelaId) => {
      const election = contract(ElectionContract)
      const distritoCRUD = contract(DistritoCRUDContract)
      const distrito = contract(DistritoContract)
      const escuela = contract(EscuelaContract)
      const mesa = contract(MesaContract)
      election.setProvider(someWeb3.currentProvider)
      distritoCRUD.setProvider(someWeb3.currentProvider)
      distrito.setProvider(someWeb3.currentProvider)
      escuela.setProvider(someWeb3.currentProvider)
      mesa.setProvider(someWeb3.currentProvider)
      let res = new Map()
      let realThis = this
      let fromObject
      let candidates = []
      someWeb3.eth.getAccounts((err, accounts) => {
        fromObject = {from : accounts[0]}
      })
      try{
        let electionInstance = await election.deployed()
        let distritoCRUDInstance = await distritoCRUD.deployed()
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(distritoId, fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let escuelaAddress = await distritoInstance.getEscuela.call(escuelaId, fromObject)
        let escuelaInstance = await escuela.at(EscuelaAddress)
        candidates = await electionInstance.getCandidates.call(fromObject)
        candidates = candidates.map(c => { return someWeb3.toAscii(c)})
        let promises = candidates.map(candidate => {
          return escuelaInstance.getCounts.call(candidate, fromObject)
        })
        Promise.all(promises).then(function(data){
          data.forEach(d => {
            res.set(someWeb3.toAscii(d[0]), d[1].toNumber())
          })
          realThis.setState({conteos : res, candidatos : candidates})
        }).catch(reason => {
          console.log(reason)
        })
      } catch(err){
        console.log(err)
      }
    }

    render() {
        return (
          <div>
          <Container>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <ComponentTitle title="Resultados parciales de estas mesas"/>
            <CustomTable itemsHeader={["Candidato","Conteo"]} itemsBody={this.state.candidatos}/>
          </Container>
          </div>
        )
    }
}
export default Mesas
