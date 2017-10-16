/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'
import RefactoredDLF from '../utils/RDLF.js'
/**
 * Controller for Component
 */
import ElectionContract from '../../build/contracts/Election.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

class CreateElection extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : "",
            candidates : []
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

        //Get only the candidates names
        candidateList = this.state.candidates.map( candidate => {
          return candidate.name
        })
        await electionInstance.createElection.sendTransaction(this.state.email, this.state.password, candidateList, fromObject)
        utils.showSuccess(this.msg, "Autoridad Electoral creada para la eleccion")
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
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }/>
                    <Form.Input
                        required
                        inline
                        label='Contraseña'
                        placeholder='Contraseña'
                        value={this.state.password}
                        onChange={ (event) => { this.setState({ password : event.target.value }) } }/>
                      <RefactoredDLF
                        title='Candidatos'
                        type='text'
                        placeholder='Nombre de Candidato'
                        onChange={this.handleNewCandidates}
                        items={this.state.candidatos}
                      />
                      <Button onClick={this.handleCreateElection.bind(this)}>
                          Registrar
                      </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default CreateElection
