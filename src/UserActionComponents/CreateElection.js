/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
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


/**
 * Contracts
*/
import ElectionContract from '../../build/contracts/Election.json'

class CreateElection extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : "",
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

    async handleCreateElection(event) {
      event.preventDefault()
      //Variables
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
        await electionInstance.createAutoridadElectoral.sendTransaction(this.state.email, this.state.password, fromObject)
        await electionInstance.createElection.sendTransaction(this.state.email, candidateList, fromObject)
        utils.showSuccess(this.msg, "Autoridad Electoral creada para la eleccion")
        this.props.history.push("/")
      } catch(error){
        utils.showError(this.msg, "Fallo en el registro:" + error)
      }
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
                  <ComponentTitle title='Crear Autoridad Electoral'/>
                  <Form>
                    <Form.Input
                        required
                        inline
                        type='email'
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={ (event) => {
                          this.setState({ email : event.target.value })
                          }
                        }
                    />
                    <Form.Input
                        required
                        inline
                        type='password'
                        label='Contraseña'
                        placeholder='Contraseña'
                        value={this.state.password}
                        onChange={ (event) => {
                          this.setState({ password : event.target.value })
                        }
                      }
                    />
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
