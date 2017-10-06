import React, { Component } from 'react';
import ElectionContract from '../../build/contracts/Election.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import { Container, Form, Button, Icon, Header} from 'semantic-ui-react'

import ComponentTitle from '../utils/ComponentTitle.js'

class Election2 extends Component {
    constructor() {
        super();
        this.state = {
            autoridadElectoral : '',
            web3 : null
        };
        this.createElection = this.createElection.bind(this)
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

    //inicializa el factory del contrato election
    createElection = (event) => {
        event.preventDefault()
        let electionInstance
        const election = contract(ElectionContract)
        election.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
            election.deployed().then((instance) => {
            electionInstance = instance
            return electionInstance.createElection.estimateGas(
              this.state.autoridadElectoral,
              {from: accounts[0]})
          }).then((gasEstimated) => {
            return electionInstance.createElection.sendTransaction(
                this.state.autoridadElectoral,
                {from: accounts[0], gas : gasEstimated})
          }).then((tx)=>{
            console.log("create election transaction finished")
          }).catch((reason) => {
            console.log(reason)
          })
        })
    }

    render () {
        return (
            <Container>
                <ComponentTitle title='Crear Elección'/>
                <Form>
                    <Header as='h3'>Autoridad de Comicio</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Autoridad de Comicio"
                        placeholder="Correo Autoridad de Comicio"
                        value={this.state.autoridadDeComicio}
                        onChange={ (event) =>
                          { this.setState({ autoridadDeComicio : event.target.value }) }
                        }
                    />
                    <Button fluid icon onClick={this.createElection}>
                        <Icon name='send'/> Crear Elección
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Election2
