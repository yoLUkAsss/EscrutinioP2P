import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import { Container, Form, Header} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'

class AddFiscal extends Component {
    constructor() {
        super()
        this.state = {
            correoFiscal : "",
            apoderadoMesa : "",
            idMesa : 0
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

    handleAddFiscal = (event) => {
      event.preventDefault()
      // const election = contract(ElectionContract)
      // election.setProvider(this.state.web3.currentProvider)
      // this.state.web3.eth.getAccounts((error, accounts) => {
      //   election.deployed().then( (electionInstance) => {
      //   return electionInstance.createElection.sendTransaction(
      //     this.state.email,
      //     this.state.password,
      //   {from:accounts[0], gas : 3000000})
      //   }).then( (result) => {
      //     utils.showSuccess(this.msg, "Registro exitoso")
      //   }).catch( (error) => {
      //     utils.showError(this.msg, "Fallo en el registro see:" + error)
      //   })
      // })
    }

    render () {
        return (
            <Container>
                <ComponentTitle title='Definir Fiscal de Mesa'/>
                <Form>
                    <Header as='h3'>Fiscal de Mesa</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Nombre del Fiscal"
                        placeholder="Nombre del Fiscal"
                        value={this.state.correoFiscal}
                        onChange={ (event) => { this.setState({ correoFiscal : event.target.value }) } }
                    />
                    <Header as='h3'>Numero de Mesa</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="ID de Mesa"
                        placeholder="ID de Mesa"
                        value={this.state.idMesa}
                        onChange={ (event) => { this.setState({ idMesa : event.target.value }) } }
                    />
                    <Button onClick={this.handleAddFiscal}>Agregar fiscal</Button>
                </Form>

            </Container>

        )
    }
}

export default AddUserToMesa
