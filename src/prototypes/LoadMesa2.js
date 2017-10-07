import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'
import { Button, Form, Header, Divider} from 'semantic-ui-react'
import Center from 'react-center'

// import ComponentTitle from '../utils/ComponentTitle.js'

// import ElectionContract from '../../build/contracts/Election.json'
import MesaElectionCRUDContract from '../../build/contracts/MesaElectionCRUD.json'
import MesaContract from '../../build/contracts/Mesa.json'

class LoadMesa2 extends Component {
    constructor() {
        super();
        this.state = {
          nombreParticipante : '',
          nombreCandidato : '',
          candidatos : [],
          mesaId : 0,
          web3 : null
        }
        this.handleLoadMesa = this.handleLoadMesa.bind(this)
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
    handleNombreParticipante = (event) => {
      this.setState({participante : event.target.value})
    }
    handleMesaId = (evt) => {
      this.setState({mesaId : evt.target.value})
    }
    handleCandidatoCountsChange = (idx) => (evt) => {
      const newCandidatos = this.state.candidatos.map((candidato, pidx) => {
        if (idx !== pidx) return candidato
        return { ...candidato, counts: evt.target.value }
      })
      this.setState({ candidatos: newCandidatos})
    }
    ////////////////////////////////////////////////////////////////////////////////

    //carga los datos de un participante
    handleLoadMesa = (event) => {
      event.preventDefault()
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      let mesaInstance
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      mesa.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        mesaElectionCRUD.deployed().then((CRUDinstance) => {
          return CRUDinstance.getMesa.call(this.state.mesaId, {from:accounts[0]})
        }).then((mesaAddress) => {
          return mesa.at(mesaAddress)
        }).then((minstance) => {
          mesaInstance = minstance
          this.state.candidatos.forEach((candidato, idC) => {
            mesaInstance.loadVotesForParticipant.estimateGas(this.state.participante, candidato.name, candidato.counts, {from:accounts[0]}).then((gasEstimated) => {
              mesaInstance.loadVotesForParticipant.sendTransaction(this.state.participante, candidato.name, candidato.counts, {from:accounts[0], gas:gasEstimated})
            })
          })
        }).then((tx) => {
          console.log("transactions sent")
        }).catch((err) => {
          console.log(err)
          console.log("something happen")
        })
      })
    }

    handleInitializeMesa = (event) => {
      event.preventDefault()
      // let mesaInstance
      const mesaElectionCRUD = contract(MesaElectionCRUDContract)
      const mesa = contract(MesaContract)
      mesaElectionCRUD.setProvider(this.state.web3.currentProvider)
      mesa.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        mesaElectionCRUD.deployed().then((crudInstance) => {
          return crudInstance.getMesa.call(this.state.mesaId, {from:accounts[0]})
        }).then((mesaAddress) => {
          return mesa.at(mesaAddress)
        }).then((minstance) => {
          return minstance.getCandidatesList.call(accounts[0])
        }).then((cands) => {
          const res = cands.map( (c) => {
            return {name: this.state.web3.toAscii(c), counts: 0}
          })
          return this.setState({candidatos : res})
        }).catch((error) => {
          console.log("finished")
        })
      })
    }

    render () {
        return (
          <Center>
          <div>
            <Header as='h2'>Buscar Mesa</Header>
            <Form onSubmit={this.handleInitializeMesa}>
              <Header as='h3'>Buscar Mesa</Header>
              <Form.Input
                type="number"
                placeholder="id de la mesa"
                value={this.state.mesaId}
                onChange={this.handleMesaId}
              />
              <Button>Buscar Mesa</Button>
            </Form>

            <Divider />

            <Form onSubmit={this.handleLoadMesa}>
              <Header as='h3'>Cargar Mesa {this.state.mesaId}</Header>
                <Form.Input
                  type="text"
                  label='Nombre del Participante'
                  placeholder="Nombre del participante"
                  value={this.state.participante}
                  onChange={this.handleNombreParticipante}
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

export default LoadMesa2
