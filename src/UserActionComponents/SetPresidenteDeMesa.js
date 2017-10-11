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

class SetPresidenteDeMesa extends Component {
    constructor() {
        super()
        this.state = {
            email : "",
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

    async handleSetPresidenteDeMesa(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        await electionInstance.setPresidenteDeMesa.sendTransaction(currentUser.getEmail(cookie), this.state.email, this.state.mesaId, fromObject)
        utils.showSuccess(this.msg, "Seteado presidente de mesa")
      } catch(error){
        console.log(error)
        utils.showError(this.msg, "Fallo en el seteo del presidente:" + error)
      }
    }

    render () {
        return (
            <Center>
            <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                <ComponentTitle title='Set Presidente de mesa'/>
                <Form>
                    <Form.Input
                        required
                        inline
                        type="email"
                        label='Email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }
                    />
                    <Form.Input
                        type="number"
                        label='id de la Mesa'
                        placeholder="id de la Mesa"
                        value={this.state.mesaId}
                        onChange={(evt) => {this.setState({ mesaId : evt.target.value })}}
                    />
                    <Button onClick={this.handleSetPresidenteDeMesa.bind(this)}>
                        Setear Presidente
                    </Button>
                </Form>
                </Container>
            </div>
            </Center>
        );
    }
}

export default SetPresidenteDeMesa
