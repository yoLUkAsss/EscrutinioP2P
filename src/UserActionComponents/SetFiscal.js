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
            candidato : "",
            mesaId : 0
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

    async handleSetFiscal(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        await electionInstance.setFiscal.sendTransaction(currentUser.getEmail(cookie), this.state.candidato, this.state.email, this.state.mesaId, fromObject)
        utils.showSuccess(this.msg, "Fiscal Asignado")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la asignación del fiscal:" + error)
      }
    }

    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Fiscal a una Mesa'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Fiscal'
                        placeholder='Correo del Fiscal'
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }
                    />
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Candidato'
                        placeholder='Partido Policito asociado'
                        value={this.state.candidato}
                        onChange={ (event) => { this.setState({ candidato : event.target.value }) } }
                    />
                    <Form.Input
                        type="number"
                        label='ID de Mesa'
                        placeholder="ID de la Mesa"
                        value={this.state.mesaId}
                        onChange={(evt) => {this.setState({ mesaId : evt.target.value })}}
                    />
                    <Button onClick={this.handleSetFiscal.bind(this)}>
                        Setear fiscal
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetFiscal
