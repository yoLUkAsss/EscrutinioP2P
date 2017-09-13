import React, { Component } from 'react';
import ElectionContract from '../build/contracts/Election.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

class MesaForm extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          participantes : [{name: ''}],
          candidatos : [{name: ''}],
          web3 : null
        }
        this.handleCreateMesa = this.handleCreateMesa.bind(this)
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

    handleNameChange = (evt) => {
      this.setState({ name: evt.target.value })
    }

    handleParticipanteNameChange = (idx) => (evt) => {
      const newParticipantes = this.state.participantes.map((participante, pidx) => {
        if (idx !== pidx) return participante
        return { ...participante, name: evt.target.value }
      })
      this.setState({ participantes: newParticipantes})
    }

    handleAddParticipante = () => {
      this.setState({ participantes: this.state.participantes.concat([{ name: '' }]) })
    }

    handleRemoveParticipante = (idx) => () => {
      this.setState({ participantes: this.state.participantes.filter((s, sidx) => idx !== sidx) })
    }

    handleCandidatoNameChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, name: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }

    handleAddCandidato = () => {
      this.setState({ candidatos: this.state.candidatos.concat([{ name: '' }]) })
    }

    handleRemoveCandidato = (idx) => () => {
      this.setState({ candidatos: this.state.candidatos.filter((s, sidx) => idx !== sidx) })
    }

    //esta harcodeado la cantidad de mesas creadas deberia ser una
    handleCreateMesa(event){
      event.preventDefault()
      const election = contract(ElectionContract)
      var electionInstance
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.createNMesas.estimateGas(this.state.participantes, this.state.candidatos, 10, 1, {from: accounts[0]})
        }).then((gasEstimated) => {
          return electionInstance.createNMesas.sendTransaction(this.state.participantes, this.state.candidatos, 10, 1, {from: accounts[0], gas: gasEstimated})
        })
      })
    }

    render () {
        return (
          <form onSubmit={this.handleCreateMesa}>
          <h2> Crear Mesa </h2>
          <h4>Nombre de la Mesa: {this.state.name}</h4>
            <input
              type="text"
              placeholder="Nombre de la mesa"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <h4>Participantes</h4>
            {this.state.participantes.map((participante, idx) => (
              <div className="participante">
                <input
                  type="text"
                  placeholder={`Participante #${idx + 1} name`}
                  value={participante.name}
                  onChange={this.handleParticipanteNameChange(idx)}
                />
                <button type="button" onClick={this.handleRemoveParticipante(idx)} className="small">-</button>
              </div>
            ))}
            <button type="button" onClick={this.handleAddParticipante} className="small">Add Participante</button><br/>

            <h4>Candidatos</h4>
            {this.state.candidatos.map((candidato, idx) => (
              <div className="candidatos">
                <input
                  type="text"
                  placeholder={`Candidato #${idx + 1} name`}
                  value={candidato.name}
                  onChange={this.handleCandidatoNameChange(idx)}
                />
                <button type="button" onClick={this.handleRemoveCandidato(idx)} className="small">-</button>
              </div>
            ))}
            <button type="button" onClick={this.handleAddCandidato} className="small">Add Candidatos</button><br/>
            <button>Crear Mesa</button>
          </form>
        );
    }
}

export default MesaForm
