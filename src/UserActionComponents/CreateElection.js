/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

import Files from 'react-files'
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
            candidates : [],
            dataFile : null
        }
        this.onFilesChange = this.onFilesChange.bind(this)
        this.onFilesError = this.onFilesError.bind(this)
      }
    onFilesChange(files) {
      console.log(files)
    }
    onFilesError(error, file) {
      console.log('error code ' + error.code + ': ' + error.message)
    }

    handleCreateElection(event){
      event.preventDefault()
      if (this.state.dataFile) {
        // let data = new FormData();
        // data.append('file', this.data);
        // axios.post('/files', data)
        api.initElectionByCSV(currentUser.getEmail(cookie),
        this.state.candidates.map(x => {return x.name}),
        this.state.dataFile).then((res) => {
          currentUser.setElectionCreated(cookie, true)
          utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
        }).catch(error => {
          console.log(error)
          utils.showError(this.msg, error.response.data)
        })
      } else {
        utils.showError(this.msg, "Debes agregar informacion de los distritos/escuelas/mesas")
      }
      // api.initElection(currentUser.getEmail(cookie), this.state.candidates.map(x => {return x.name})).then((res) => {
      //   currentUser.setElectionCreated(cookie, true)
      //   utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
      // }).catch(error => {
      //   console.log(error)
      //   utils.showError(this.msg, error.response.data)
      // })
    }
    handleNewCandidates = (newCandidates) => {
      this.setState({candidates : newCandidates})
    }
    renderFileReader = () => {
      return (
            <div>
              <Files
                 className='files-dropzone'
                 onChange={this.onFilesChange}
                 onError={this.onFilesError}
                 accepts={['image/png', 'text/plain', 'audio/*']}
                 multiple
                 maxFiles={3}
                 maxFileSize={10000000}
                 minFileSize={0}
                 clickable
               >
                 Drop files here or click to upload
               </Files>
             </div>
             )
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
                {
                  this.renderFileReader()
                }
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateElection)

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
