import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import { Container, Form, Header} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'

class DelegatePresidenteDeMesa extends Component {
    constructor() {
        super();
        this.state = {
            correoDelegadoGeneral : "",
            autoridadDeComicio : "",
            idMesa : 0
        };


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

    render () {
        return (
            <Container>

                <ComponentTitle title='Definir Presidente de Mesa'/>

                <Form>

                    <Header as='h3'>Autoridad Superior (Autoridad de Comicio)</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Correo de la Autoridad de Comicio"
                        placeholder="Correo de la Autoridad de Comicio"
                        value={this.state.autoridadDeComicio}
                        onChange={ (event) => { this.setState({ autoridadDeComicio : event.target.value }) } }
                    />

                    <Header as='h3'>Delegado General</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Nombre del Delegado General"
                        placeholder="Nombre del Delegado General"
                        value={this.state.correoDelegadoGeneral}
                        onChange={ (event) => { this.setState({ correoDelegadoGeneral : event.target.value }) } }
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

                </Form>

            </Container>

        )
    }
}

export default DelegatePresidenteDeMesa
