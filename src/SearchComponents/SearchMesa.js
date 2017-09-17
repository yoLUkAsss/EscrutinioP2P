import React, { Component } from 'react'

import MesaContract from '../../build/contracts/Mesa.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import Center from 'react-center'

import SearchMesaForm from './SearchMesaForm.js'

class SearchMesa extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          nombreParticipante : '',
          nombreCandidato : '',
          mesaAddress : '',

        //   Estos hay que borrar
          isParticipant : '',
          isFiscal : '',
          isApoderado : ''
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
            console.log(mesaInstance)
            return mesaInstance.getParticipantVotesForACandidate.call(this.state.nombreParticipante, this.state.nombreCandidato, {from : accounts[0]})
          }).then((obj) => {
            //this.state.web3.toAscii(x)
            console.log("El valor es: " + JSON.stringify(obj, undefined, 2))
            alert(obj)
          })
        })
    }

    isParticipant = (event) => {
        event.preventDefault()
        var mesaInstance
        const mesa = contract(MesaContract)
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          mesa.at(this.state.mesaAddress).then((mInstance) => {
            mesaInstance = mInstance
            return mesaInstance.isValidParticipant.call(this.state.isParticipant, {from : accounts[0]})
          }).then((obj) => {
            //this.state.web3.toAscii(x)
            console.log("El resultado es: " + JSON.stringify(obj, undefined, 2))
            alert(obj)
          })
        })
    }

    isFiscal = (event) => {
        event.preventDefault()
        var mesaInstance
        const mesa = contract(MesaContract)
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          mesa.at(this.state.mesaAddress).then((mInstance) => {
            mesaInstance = mInstance
            return mesaInstance.isFiscal.call(this.state.isFiscal, {from : accounts[0]})
          }).then((obj) => {
            //this.state.web3.toAscii(x)
            console.log("El resultado es: " + JSON.stringify(obj, undefined, 2))
            alert(obj)
          })
        })
    }

    isApoderado = (event) => {
        event.preventDefault()
        var mesaInstance
        const mesa = contract(MesaContract)
        mesa.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {
          mesa.at(this.state.mesaAddress).then((mInstance) => {
            mesaInstance = mInstance
            return mesaInstance.isApoderadoDeMesa.call(this.state.isApoderado, {from : accounts[0]})
          }).then((obj) => {
            //this.state.web3.toAscii(x)
            console.log("El resultado es: " + JSON.stringify(obj, undefined, 2))
            alert(obj)
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
                    <h3> Buscar conteo de un participante a un candidato </h3>
                    <input
                        type="text"
                        placeholder="Direccion de mesa"
                        value={this.state.mesaAddress}
                        onChange={(evt) => {this.setState({ mesaAddress : evt.target.value })}}
                    />
                    <br/>
                    <input
                        type="text"
                        placeholder="Nombre del participante"
                        value={this.state.nombreParticipante}
                        onChange={(evt) => {this.setState({ nombreParticipante : evt.target.value })}}
                    />
                    <br/>
                    <input
                        type="text"
                        placeholder="Nombre del candidato"
                        value={this.state.nombreCandidato}
                        onChange={(evt) => {this.setState({ nombreCandidato : evt.target.value })}}
                    />
                    <br/>
                    <input type="submit" value="Buscar" />
                </form>
                <hr/>

                <form onSubmit={this.isParticipant.bind(this)}>
                    <h3> Validar Participante </h3>
                    <input
                        type="text"
                        placeholder="Nombre de participante"
                        value={this.state.isParticipant}
                        onChange={(evt) => {this.setState({ isParticipant : evt.target.value })}}
                    />
                    <br/>
                    <input type="submit" value="Validar" />
                </form>
                <hr/>

                <form onSubmit={this.isFiscal.bind(this)}>
                    <h3> Validar Fiscal </h3>
                    <input
                        type="text"
                        placeholder="Nombre de fiscal"
                        value={this.state.isFiscal}
                        onChange={(evt) => {this.setState({ isFiscal : evt.target.value })}}
                    />
                    <br/>
                    <input type="submit" value="Validar" />
                </form>
                <hr/>

                <form onSubmit={this.isApoderado.bind(this)}>
                    <h3> Validar Apoderado de Mesa </h3>
                    <input
                        type="text"
                        placeholder="Nombre de apoderado"
                        value={this.state.isApoderado}
                        onChange={(evt) => {this.setState({ isApoderado : evt.target.value })}}
                    />
                    <br/>
                    <input type="submit" value="Validar" />
                </form>

                <SearchMesaForm/>
            </div>
            </Center>
        )
    }
}

export default SearchMesa
