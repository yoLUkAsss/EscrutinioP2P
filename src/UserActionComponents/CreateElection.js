/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

// import ReactFileReader from 'react-file-reader';

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'
import RefactoredDLF from '../utils/RDLF.js'
/**
 * Controller for Component
 */
// import contract from 'truffle-contract'
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'

/**
 * Contracts
*/
// import ElectionContract from '../../build/contracts/Election.json'

class CreateElection extends Component {
    constructor() {
        super()
        this.state = {
            candidates : []
        }
    }
    handleCreateElection(event){
      event.preventDefault()
      api.initElection(currentUser.getEmail(cookie), this.state.candidates.map(x => {return x.name})).then((res) => {
        currentUser.setElectionCreated(cookie, true)
        utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Fallo en la creacion de la eleccion")
      })
    }
    handleNewCandidates = (newCandidates) => {
      this.setState({candidates : newCandidates})
    }
    render () {
        return (
            <Center>
              <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <ComponentTitle title='Crear Eleccion con los siguientes candidatos'/>
                  <Form>
                    <RefactoredDLF
                      title='Candidatos'
                      type='text'
                      placeholder='Nombre de Candidato'
                      onChange={this.handleNewCandidates}
                      items={this.state.candidatos}
                      add={"Agregar Candidato"}
                      del={"Eliminar Candidato"}
                    />
                    <Button onClick={this.handleCreateElection.bind(this)}>
                        Crear Eleccion
                    </Button>
                  </Form>
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateElection)

// this.reader = new FileReader()
// handleFiles = files => {
//   this.reader.onload = e => {
//     this.createElectionByCSV(this.reader.result)
//   }
//   this.reader.readAsText(files[0])
// }
//ver: https://github.com/adaltas/node-csv
//distrito,escuela,mesa

// getLines = (csv) => {
//   return csv.split(/r?\n/)
// }
//
// getLine = (line) => {
//   return line.split(/;|,/)
// }

// async createElectionByCSV(file) {
//   let fromObject
//   const election = contract(ElectionContract)
//   election.setProvider(this.state.web3.currentProvider)
//   this.state.web3.eth.getAccounts((err, accs) => {
//     fromObject = {from:accs[0], gas : 3000000}
//   })
//   try{
//     let electionInstance = await election.deployed()
//     let lines = this.getLines(file).filter(x => {return x !== ""})
//     let ids, idDistrito, idEscuela, idMesa
//     let promises = lines.map(line => {
//       ids = this.getLine(line)
//       idDistrito = ids[0]
//       idEscuela = ids[1]
//       idMesa = ids[2]
//       return electionInstance.createElectionByCSV.sendTransaction(currentUser.getEmail(cookie), idDistrito, idEscuela , idMesa, fromObject)
//     })
//     Promise.all(promises).then(() => {
//       console.log("working correctly")
//       utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
//     }).catch(err => {
//       console.log("some thing failed")
//       // throw new Error("failed create distrito/escuela/mesa")
//     })
//   } catch(error){
//     console.log(error)
//     utils.showError(this.msg, "Fallo en la creacion de la eleccion")
//   }
// }
// renderFileReader = () => {
//   return (
//         <div>
//           <Header as='h3'>Cargar datos en csv: distrito,escuela,mesa</Header>
//           <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
//             <button className='btn'>Upload</button>
//           </ReactFileReader>
//         </div>
//          )
// }
