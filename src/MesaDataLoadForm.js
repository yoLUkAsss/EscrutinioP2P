import React, { Component } from 'react';
// import ElectionContract from '../build/contracts/Election.json'
import MesaContract from '../build/contracts/Mesa.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'

// const util = require('ethereumjs-util');

class MesaDataLoadForm extends Component {
    constructor() {
        super();
        this.state = {
          nombreParticipante : '',
          mesaAddress: '',
          candidatos : [],
          web3 : null
        }
        this.handleCargarMesa = this.handleCargarMesa.bind(this)
        this.handleBuscarMesa = this.handleBuscarMesa.bind(this)
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

    ////////////////////////////////////////////////////////////////////////////////
    //Manejan los cambios del nomre de participante y de la mesa y de los conteos
    handleNombreParticipanteChange = (event) => {
      this.setState({nombreParticipante : event.target.value})
    }
    handleMesaAddressChange = (evt) => {
      this.setState({mesaAddress : evt.target.value})
    }
    handleCandidatoCountsChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    ////////////////////////////////////////////////////////////////////////////////
    // for(var i = 0; i < this.state.candidatos.length; i++){
    // }
    //this.state.web3.toHex(cnd.name)
    //this.state.nombreParticipante
    // no funciona hay un error en alguno de los parametros del load
    handleCargarMesa(event){
      event.preventDefault()
      var mesaInstance
      var cnd
      const mesa = contract(MesaContract)
      mesa.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        mesa.at(this.state.mesaAddress).then((mInstance) => {
          mesaInstance = mInstance
          cnd = this.state.candidatos[0]
          console.log(mesaInstance)
          console.log("antes de estimar")
          return mesaInstance.loadVotesForParticipant.estimateGas("pepe", "pepe", 10, {from:accounts[0]})
        }).then((gasEstimated) => {
          console.log("desupues de estimar")
          return mesaInstance.loadVotesForParticipant.sendTransaction("pepe", "pepe", 10, {from:accounts[0], gas: gasEstimated})
        }).then((wasLoaded) => {
          if(wasLoaded){
            console.log("cargado correctamente")
          } else{
            console.log("no fue cargado")
          }
        })
      })
    }

    //busca una mesa y setea la lista de candidatos en 0, luego elegimos con q nombre de particiapnte cargar esa lista
    handleBuscarMesa = (event) => {
      event.preventDefault()
      // var address = event.target.value
      var mesaInstance
      const mesa = contract(MesaContract)
      mesa.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        mesa.at(this.state.mesaAddress).then((mInstance) => {
          console.log(mInstance)
          mesaInstance = mInstance
          return mesaInstance.getCandidates.call(accounts[0])
        }).then((cands) => {
          //this.state.web3.toAscii(x)
          const res = cands.map(c => {
            return {name: this.state.web3.toAscii(c), counts: 0}
          })
          return this.setState({candidatos : res})
          })
        })
    }

    render () {
        return (
          <div>
            <form onSubmit={this.handleBuscarMesa}>
              <h2>Buscar Mesa</h2>
              <input
                type="text"
                placeholder="Direccion de la mesa"
                value={this.state.mesaAddress}
                onChange={this.handleMesaAddressChange}
              />
              <button>Buscar Mesa</button>
            </form>
            <form onSubmit={this.handleCargarMesa}>
              <h2>Cargar Mesa</h2>
                <input
                  type="text"
                  placeholder="Nombre del participante"
                  value={this.state.nombreParticipante}
                  onChange={this.handleNombreParticipanteChange}
                />
                <h4>Candidatos</h4>
                {this.state.candidatos.map((candidato, idx) => (
                  <div className="candidatos">
                  <label htmlFor={`count${idx}`}>{`Candidato #${idx + 1} ${candidato.name}`}</label>
                    <input
                      type="number"
                      id={`count${idx}`}
                      placeholder={`Candidato #${idx + 1} counts`}
                      value={candidato.counts}
                      onChange={this.handleCandidatoCountsChange(idx)}
                    />
                  </div>
                ))}
                <button>Cargar Mesa</button>
            </form>
          </div>
        );
    }
}

export default MesaDataLoadForm
