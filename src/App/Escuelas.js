import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'

class Escuelas extends Component {
    render() {
        return (
          <div>
          <Container>
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
