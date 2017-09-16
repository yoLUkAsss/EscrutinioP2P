import React, { Component } from 'react';
import ElectionContract from '../build/contracts/Election.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

import Center from 'react-center'

class MesaForm extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          apoderado : {name : ''},
          participantes : [{name: ''}],
          candidatos : [{name: ''}],
          web3 : null,
          addresses : []
        }
        this.handleCreateMesa = this.handleCreateMesa.bind(this)
        this.updateMesas = this.updateMesas.bind(this)
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

    updateMesas(event) {
      event.preventDefault()
      const election = contract(ElectionContract)
      var electionInstance
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.getMesas.call(accounts[0])
        }).then((mesas) => {
          return this.setState({addresses: mesas})
        })
      })
    }

    handleNameChange = (evt) => {
      this.setState({ name: evt.target.value })
    }

    handleApoderadoChange = (evt) => {
      this.setState({ apoderado: {name : evt.target.value} })
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
      
      // .filter(x => {return x !== ""}) LIMPIA LOS VACIOS o BLANCOS
      var apoderado = this.state.apoderado.name
      var ps = this.state.participantes.map(x => {return x.name}).filter(x => {return x !== ""})
      var cs = this.state.candidatos.map(x => {return x.name}).filter(x => {return x !== ""})
      console.log("Apoderado: " + apoderado +" ps: " + JSON.stringify(ps) + " cs: " + JSON.stringify(cs))
      this.state.web3.eth.getAccounts((error, accounts) => {
        election.deployed().then((instance) => {
          electionInstance = instance
          return electionInstance.createNMesas.estimateGas(apoderado, ps, cs, 10, 1, {from: accounts[0]})
        }).then((gasEstimated) => {
          return electionInstance.createNMesas.sendTransaction(apoderado, ps, cs, 10, 1, {from: accounts[0], gas: gasEstimated})
        }).then((idtx) => {
          alert("Transaccion enviada")
        })
      })
    }

    toLi(ls){
      return (<ul>
      {
        ls.map(x => {
          return (<li>{x}</li>)
        }
      )}
      </ul>)
    }

    render () {
        return (
          <Center>
          <div>  
            <form onSubmit={this.handleCreateMesa}>
            <h2> Crear Mesa </h2>
            <h4>Nombre de la Mesa: {this.state.name}</h4>
              <input
                type="text"
                placeholder="Nombre de la mesa"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <input
                type="text"
                placeholder="Nombre del apoderado"
                value={this.state.apoderado.name}
                onChange={this.handleApoderadoChange}
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

            <div>
              <button type="button" onClick={this.updateMesas}>
                Ver direcciones de las mesas
              </button>
              {this.toLi(this.state.addresses)}
            </div>

          </div>
          </Center>
        );
    }
}

export default MesaForm
