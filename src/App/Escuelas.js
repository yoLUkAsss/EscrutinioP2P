import React, { Component } from 'react'
import AlertContainer from 'react-alert'
import {Container} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'
import * as utils from '../utils/utils.js'
import getWeb3 from '../utils/getWeb3'

class Escuelas extends Component {
    componentWillMount() {
      getWeb3.then(results => {
        this.setState({web3 : results.web3})
      }).catch(() => {
          console.log('Error finding web3.')
      })
    }

    render() {
        return (
          <div>
          <Container>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <ComponentTitle title="Resultados parciales de estas escuelas"/>
          </Container>
          </div>
        )
    }
}
export default Escuelas

// handleGetDistrito = async (cweb3, distritoId) => {
//   const election = contract(ElectionContract)
//   const distritoCRUD = contract(DistritoCRUDContract)
//   const distrito = contract(DistritoContract)
//   distritoCRUD.setProvider(cweb3.currentProvider)
//   distrito.setProvider(cweb3.currentProvider)
//   let fromObject
//   let currentUserEmail = currentUser.getEmail(cookie)
//   cweb3.eth.getAccounts((error, accounts) => {
//     fromObject = {from : accounts[0]}
//   })
//   try{
//     //aca se deberia pedir el conteo parcial del distrito {distritoid}
//     let electionInstance = await election.deployed()
//     // let distritoCRUDInstance = await distritoCRUD.deployed()
//     // let currentDistritoAddress = await distritoCRUDInstance.getDistrito.call(distritoId, fromObject)
//     // let distritoInstance = await distrito.at(currentDistritoAddress)
//     let candidates = await electionInstance.getCandidates.call(fromObject)
//     let newConteo = new Map()
//     candidates.forEach(c => {
//       newConteo.set(c, 0)
//     })
//     this.setState({conteo : newConteo})
//   } catch(err){
//     console.log(err)
//     this.setState({isDistritoInvalid : true})
//   }
// }
