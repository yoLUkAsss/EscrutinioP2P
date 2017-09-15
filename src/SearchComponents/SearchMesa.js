import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import Center from 'react-center'



class SearchMesa extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          nombreParticipante : '',
          nombreCandidato : '',
          mesaAddress : ''
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

    buscarInfoDeParticipanteCandidato = (event) => {
        event.preventDefault()
        var mesaInstance
        const mesa = contract(MesaContract)
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          mesa.at(this.state.mesaAddress).then((mInstance) => {
            mesaInstance = mInstance
            return mesaInstance.getParticipantVotesForACandidate.call(this.state.nombreParticipante, this.state.nombreCandidato, {from : accounts[0]})
          }).then((obj) => {
            //this.state.web3.toAscii(x)
            console.log("El valor es: " + JSON.stringify(obj, undefined, 2))
          })
        })
    }

    render() {
        return (
            <Center>
            <div>
            
                <h4> Will be covered </h4>

                <h1> Busqueda de conteo </h1>

                <form onSubmit={this.buscarInfoDeParticipanteCandidato.bind(this)}>
                    <input
                        type="text"
                        placeholder="Direccion de mesa"
                        value={this.state.mesaAddress}
                        onChange={(evt) => {this.setState({ mesaAddress : evt.target.value })}}
                    />
                    <input
                        type="text"
                        placeholder="Nombre del participante"
                        value={this.state.nombreParticipante}
                        onChange={(evt) => {this.setState({ nombreParticipante : evt.target.value })}}
                    />
                    <input
                        type="text"
                        placeholder="Nombre del candidato"
                        value={this.state.nombreCandidato}
                        onChange={(evt) => {this.setState({ nombreCandidato : evt.target.value })}}
                    />

                    <input type="submit" value="Buscar" />

                </form>

            </div>
            </Center>
        )
    }
}

export default SearchMesa