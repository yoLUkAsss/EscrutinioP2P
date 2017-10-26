/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form, Divider, Header } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

import ReactFileReader from 'react-file-reader';

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'
import RefactoredDLF from '../utils/RDLF.js'
/**
 * Controller for Component
 */
import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'

/**
 * Contracts
*/
import ElectionContract from '../../build/contracts/Election.json'

class CreateElection extends Component {
    constructor() {
        super()
        this.state = {
            candidates : [],
            web3 : null
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

    handleFiles = files => {
      let reader = new FileReader()
      reader.onload = e => {
        console.log(reader.result)
        // this.handleReadElectionCSV(reader.result)
      }
      reader.readAsText(files[0])
    }

    //distrito,escuela,mesa
    handleReadElectionCSV = async (csv) => {
      // let fromObject
      // let candidateList
      // const election = contract(ElectionContract)
      // election.setProvider(this.state.web3.currentProvider)
      // this.state.web3.eth.getAccounts((err, accs) => {
      //   fromObject = {from:accs[0], gas : 3000000}
      // })
      // let electionInstance = await election.deployed()
      let distrito
      let escuela
      let mesa

      for(let line of csv){
        distrito = line[0]
        escuela = line[1]
        mesa = line[2]
        // electionInstance.createElectionByCSV(distrito, escuela, mesa)
        console.log(line)
        console.log(distrito)
        console.log(escuela)
        console.log(mesa)
      }
    }

    async handleCreateElection(event) {
      event.preventDefault()
      let fromObject
      let candidateList
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        candidateList = this.state.candidates.map( candidate => {
          return candidate.name
        })
        await electionInstance.setAutoridadElectoral.sendTransaction(currentUser.getEmail(cookie), fromObject)
        await electionInstance.createElection.sendTransaction(currentUser.getEmail(cookie), candidateList, fromObject)
        utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la creacion de la eleccion")
      }
    }
    handleNewCandidates = (newCandidates) => {
      this.setState({candidates : newCandidates})
    }

    renderFileReader = () => {
      return (
            <div>
              <Header as='h3'>Cargar datos en csv: distrito,escuela,mesa</Header>
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
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
                  <Divider/>
                  {this.renderFileReader()}
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateElection)
