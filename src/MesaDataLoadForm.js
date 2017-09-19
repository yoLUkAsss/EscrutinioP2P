import React, { Component } from 'react';
// import ElectionContract from '../build/contracts/Election.json'
import MesaContract from '../build/contracts/Mesa.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'
import { Button, Form, Header} from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
// const util = require('ethereumjs-util');

import Center from 'react-center'

class MesaDataLoadForm extends Component {
    constructor() {
        super();
        this.state = {
          nombreParticipante : '',
          nombreCandidato : '',
          candidatoAValidar : '',
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
    handleCandidatoAValidar = (evt) => {
      this.setState({candidatoAValidar : evt.target.value})
    }
    handleCandidatoCountsChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    handleNombreCandidatoChange = (event) => {
      this.setState({nombreCandidato : event.target.value})
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
          return mesaInstance.loadVotesForParticipant.estimateGas(this.state.nombreParticipante, cnd.name, cnd.counts, {from:accounts[0]})
        }).then((gasEstimated) => {
          return mesaInstance.loadVotesForParticipant.sendTransaction(this.state.nombreParticipante, cnd.name, cnd.counts, {from:accounts[0], gas: gasEstimated})
        }).then((wasLoaded) => {
          console.log("Transaction Completed")
          alert("Transaccion enviada")
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
          mesaInstance = mInstance
          return mesaInstance.getCandidates.call(accounts[0])
        }).then((cands) => {
          //this.state.web3.toAscii(x)
          const res = cands.map(c => {
            return {name: this.state.web3.toAscii(c), counts: 0}
          })
          console.log(JSON.stringify(res, undefined, 2))
          return this.setState({candidatos : res})
        })
      })
    }

    render () {
        return (
          <Center>
          <div>
            <Header as='h2'>vi</Header>
            <Form onSubmit={this.handleBuscarMesa}>
              <Header as='h2'>Buscar Mesa</Header>
              <Form.Input
                type="text"
                placeholder="Direccion de la mesa"
                value={this.state.mesaAddress}
                onChange={this.handleMesaAddressChange}
              />
              <Button>Buscar Mesa</Button>
            </Form>

            <Form onSubmit={this.handleCargarMesa}>
              <Header as='h3'>Cargar Mesa</Header>
                <Form.Input
                  type="text"
                  label='Nombre del Participante'
                  placeholder="Nombre del participante"
                  value={this.state.nombreParticipante}
                  onChange={this.handleNombreParticipanteChange}
                />
                <Header as='h3'>Candidatos</Header>
                {this.state.candidatos.map((candidato, idx) => (
                  <Form.Input
                    type='number'
                    label={`Candidato: ${candidato.name}`}
                    placeholder={`Candidato: ${idx + 1}`}
                    value={candidato.counts}
                    onChange={this.handleCandidatoCountsChange(idx)}
                    />
                ))}
                <Button>Cargar Mesa</Button>
            </Form>
          </div>
          </Center>
        );
    }
}

export default MesaDataLoadForm
