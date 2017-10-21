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

class SetDelegadoDeDistrito extends Component {
    constructor() {
        super()
        this.state = {
            correoDelegado : "",
            idDelDistrito : ""
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

    async handleSetDelegadoDeDistrito(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{

        await electionInstance.setDelegadoDeDistrito.sendTransaction( 
            currentUser.getEmail(cookie),
            this.state.correoDelegado,
            this.state.idDelDistrito,
            fromObject
        )

        utils.showSuccess(this.msg, "Delegado de Distrito Asignado Correctamente")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en la :" + error)
      }
    }

    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Asignar Delegado de Distrito'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Delegado'
                        placeholder='Correo del Delegado'
                        value={this.state.correoDelegado}
                        onChange={ (event) => { this.setState({ correoDelegado : event.target.value }) } }
                    />
                    <Form.Input
                        type="number"
                        label='Distrito'
                        placeholder="ID del Distrito"
                        value={this.state.idDelDistrito}
                        onChange={(evt) => {this.setState({ idDelDistrito : evt.target.value })}}
                    />
                    <Button onClick={this.handleSetDelegadoDeDistrito.bind(this)}>
                        Asignar
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetDelegadoDeDistrito
