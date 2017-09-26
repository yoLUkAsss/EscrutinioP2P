import React, { Component } from 'react';
import ElectionContract from '../build/contracts/Election.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

import { Container, Form, Header, Button, Icon} from 'semantic-ui-react'

import ComponentTitle from './utils/ComponentTitle.js'
import DinamicListForm from './DinamicListForm.js'

class Election extends Component {
    constructor() {
        super();
        this.state = {
            autoridadDeComicio : '',
            candidatos : [{name : ''}],
            apoderados : [{correo : ''}],
            delegadoGeneral : '',
            numeroDeMesas : 1,
            personasPorMesa : 2
        };


    }

    crearEleccion = (event) => {
        event.preventDefault()
        alert(JSON.stringify(this.state, undefined, 2))
    }

    //manejo de lista de  candidato
    handleAddCandidato = () => {
        this.setState({ candidatos: this.state.candidatos.concat([{ name: '' }]) })
    }

    handleUpdateCandidato = (idx) => (evt) => {
    const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, name: evt.target.value }
    })
        this.setState({ candidatos: newCandidatos})
    }

    handleRemoveCandidato = (idx) => () => {
        this.setState({ candidatos: this.state.candidatos.filter((s, sidx) => idx !== sidx) })
    }

    //manejo de lista de apoderados
    handleAddApoderado = () => {
        this.setState({ apoderados: this.state.apoderados.concat([{ correo: '' }]) })
    }

    handleUpdateApoderado = (idx) => (evt) => {
    const newApoderados = this.state.apoderados.map((apoderado, pidx) => {
        if (idx !== pidx) return apoderado
        return { ...apoderado, correo: evt.target.value }
    })
        this.setState({ apoderados: newApoderados})
    }

    handleRemoveApoderado = (idx) => () => {
        this.setState({ apoderados: this.state.apoderados.filter((s, sidx) => idx !== sidx) })
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
    createElection(event) {
        event.preventDefault()

        var nombresDePartidos = []
        this.state.candidatos.forEach( candidato => {
            nombresDePartidos.push(candidato.name)
        })

        var correosDeApoderados = []
        this.state.apoderados.forEach( apoderado => {
            correosDeApoderados.push(apoderado.correo)
        })

        const election = contract(ElectionContract)
        var electionInstance
        election.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
            election.deployed().then((instance) => {
            // console.log(JSON.stringify(instance, undefined, 2))
            electionInstance = instance
            return electionInstance.createElection( 
                this.state.autoridadDeComicio,
                this.state.numeroDeMesas,
                nombresDePartidos,
                this.state.personasPorMesa,
                correosDeApoderados,
                this.state.delegadoGeneral,
                {from: accounts[0]}
            )
            }).then((setResult) => {
            return electionInstance.getName.call(accounts[0])
            }).then((getResult) => {
            return this.setState({depAddress: electionInstance.address, electionName: getResult})
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
                        onChange={ (event) => { this.setState({ autoridadDeComicio : event.target.value }) } }
                    />

                    <Header as='h3'>Delegado General</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Delegado General"
                        placeholder="Correo Delegado General"
                        value={this.state.delegadoGeneral}
                        onChange={ (event) => { this.setState({ delegadoGeneral : event.target.value }) } }
                    />

                    <DinamicListForm
                        title='Partidos Politicos Oficiales'
                        type='text'
                        placeholder='Partido Politico'
                        items={this.state.candidatos}
                        onAdd={this.handleAddCandidato}
                        onDelete={this.handleRemoveCandidato}
                        onUpdate={this.handleUpdateCandidato}
                    />

                    <DinamicListForm
                        title='Apoderados de los Partidos'
                        type='mail'
                        placeholder='Apoderado'
                        items={this.state.apoderados}
                        onAdd={this.handleAddApoderado}
                        onDelete={this.handleRemoveApoderado}
                        onUpdate={this.handleUpdateApoderado}
                    />

                    <Header as='h3'>Cantidad de Mesas participantes</Header>
                    <Form.Input
                        required
                        type="number" min={1}
                        title="Cantidad de Mesas participantes"
                        placeholder="Numero de Mesas"
                        value={this.state.numeroDeMesas}
                        onChange={ (event) => { this.setState({ numeroDeMesas : event.target.value }) } }
                    />

                    <Header as='h3'>Cantidad de personas por Mesa</Header>
                    <Form.Input
                        required
                        type="number" min={2}
                        title="Cantidad de personas por Mesa"
                        placeholder="Cantidad de personas"
                        value={this.state.personasPorMesa}
                        onChange={ (event) => { this.setState({ personasPorMesa : event.target.value }) } }
                    />

                    <Button fluid icon onClick={this.crearEleccion}>
                        <Icon name='send'/> Crear Elección
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Election
