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

class SetDelegadoDeEscuela extends Component {
    constructor() {
        super()
        this.state = {
            correoDelegado : "",
            idDelDistrito : "",
            idDeLaEscuela : ""
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

    async handleSetDelegadoDeEscuela(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{

        await electionInstance.setDelegadoDeEscuela.sendTransaction(
            currentUser.getEmail(cookie),
            this.state.correoDelegado,
            this.state.idDelDistrito,
            this.state.idDeLaEscuela,
            fromObject
        )

        utils.showSuccess(this.msg, "Delegado de Distrito Asignado Correctamente")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la :" + error)
      }
    }
    handleDelegadoEscuela = (event) => { this.setState({ correoDelegado : event.target.value }) }
    handleDistrito = (evt) => {this.setState({ idDelDistrito : evt.target.value })}
    handleEscuela = (evt) => {this.setState({ idDeLaEscuela : evt.target.value })}
    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Delegado de Escuela'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Delegado'
                        placeholder='Correo del Delegado'
                        value={this.state.correoDelegado}
                        onChange={this.handleDelegadoEscuela.bind(this)}
                    />
                    <Form.Input
                        type="number"
                        label='Distrito'
                        placeholder="ID del Distrito"
                        value={this.state.idDelDistrito}
                        onChange={this.handleDistrito.bind(this)}
                    />
                    <Form.Input
                        type="number"
                        label='Escuela'
                        placeholder="ID de la escuela"
                        value={this.state.idDeLaEscuela}
                        onChange={this.handleEscuela.bind(this)}
                    />
                    <Button onClick={this.handleSetDelegadoDeEscuela.bind(this)}>
                        Asignar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetDelegadoDeEscuela
