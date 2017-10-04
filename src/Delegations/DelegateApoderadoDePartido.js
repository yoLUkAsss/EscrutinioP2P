import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import { Container, Form, Header} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'

class DelegateApoderadoDePartido extends Component {
    constructor() {
        super();
        this.state = {
            autoridadDeComicio : "",
            apoderadoDePartido : "",
            partidoPolitico : ""
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

                <ComponentTitle title='Crear Elección'/>

                <Form>


                    <Header as='h3'>Autoridad de Comicio</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Correo de la Autoridad"
                        placeholder="Correo Autoridad de Comicio"
                        value={this.state.autoridadDeComicio}
                        onChange={ (event) => { this.setState({ autoridadDeComicio : event.target.value }) } }
                    />

                    <Header as='h3'>Apoderado de Mesa</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Correo del Apoderado"
                        placeholder="Correo del Apoderado de Partido"
                        value={this.state.apoderadoDePartido}
                        onChange={ (event) => { this.setState({ apoderadoDePartido : event.target.value }) } }
                    />

                    <Header as='h3'>Partido Politico asociado</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Nombre del Partido Politico"
                        placeholder="Nombre del Partido Politico"
                        value={this.state.partidoPolitico}
                        onChange={ (event) => { this.setState({ partidoPolitico : event.target.value }) } }
                    />

                </Form>

            </Container>

        )
    }
}

export default DelegateApoderadoDePartido
