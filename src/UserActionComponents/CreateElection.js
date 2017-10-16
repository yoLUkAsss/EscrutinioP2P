/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'

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
import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'

class CreateElection extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : "",
            candidates : [],
            cantidad : 1,
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
      const election = contract(ElectionContract)
      const mesaCRUD = contract(MesaElectionCRUDContract)
      election.setProvider(this.state.web3.currentProvider)
      mesaCRUD.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        await electionInstance.createElection.sendTransaction(this.state.email, this.state.password, this.state.candidates, fromObject)
        let mesaCRUDInstance = await mesaCRUD.deployed()
        let promises = []
        for(let i = 0; i<this.state.cantidad;i++){
          promises.push(mesaCRUDInstance.createMesaElection.sendTransaction(fromObject))
        }
        Promise.all(promises).then(() => {
          utils.showSuccess(this.msg, "Autoridad Electoral creada para la eleccion")
        }).catch(error => {
          console.log(error)
          utils.showError(this.msg, "Fallo la creacion de mesas:")
        })
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
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }
                    />
                    <Form.Input
                        required
                        inline
                        type='password'
                        label='Contraseña'
                        placeholder='Contraseña'
                        value={this.state.password}
                        onChange={ (event) => { this.setState({ password : event.target.value }) } }
                    />
                    <Form.Input
                      required
                      inline
                      type='number'
                      min={1}
                      label='Cantidad de mesas'
                      placeholder='cantidad'
                      value={this.state.cantidad}
                      onChange={(event) => {this.setState({cantidad : event.target.value})}}
                    />
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
