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

/**
 * Controller for Component
 */
import ElectionContract from '../../build/contracts/Election.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import cookie from 'react-cookies'

class SetFiscal extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
            candidato : ""
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

    async handleSetApoderado(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        await electionInstance.setApoderado.sendTransaction(currentUser.getEmail(cookie), this.state.email, this.state.candidato, fromObject)
        utils.showSuccess(this.msg, "Apoderado del partido " + this.state.candidato + " configurado correctamente")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la carga del apoderado:" + error)
      }
    }

    handleCandidato = (event) => { this.setState({ candidato : event.target.value }) }
    handleApoderado = (event) => { this.setState({ email : event.target.value }) }
    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Apoderado de Partido'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Apoderado'
                        placeholder='Correo del Apoderado'
                        value={this.state.email}
                        onChange={this.handleApoderado.bind(this)}
                    />
                    <Form.Input
                        required
                        inline
                        type="text"
                        label='Candidato'
                        placeholder='Partido Policito asociado'
                        value={this.state.candidato}
                        onChange={this.handleCandidato.bind(this)}
                    />
                    <Button onClick={this.handleSetApoderado.bind(this)}>
                        Asignar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetFiscal
