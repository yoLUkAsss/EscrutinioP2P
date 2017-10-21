// react utilities
import React, { Component } from 'react';
import { Button, Divider, Form, Header, Container} from 'semantic-ui-react'
import {withRouter, Switch, Route} from 'react-router-dom'
import AlertContainer from 'react-alert'

// Utils
import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'

// Contracts
import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
import DistritoContract from '../../build/contracts/Distrito.json'

//components
import Mesas from './Mesas.js'
import Mesa from './Mesa.js'

class Escuela extends Component {
    constructor(props) {
        super(props)
        this.state = {
          mesaId : 0,
          isEscuelaInvalid : false
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.handleGetEscuela(results.web3, this.props.distritoId, this.props.match.params.escuelaId)
        this.setState({
          web3: results.web3
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
    }

    handleGetEscuela = async (cweb3, distritoId, escuelaId) => {
      const distritoCRUD = contract(DistritoCRUDContract)
      const distrito = contract(DistritoContract)
      distritoCRUD.setProvider(cweb3.currentProvider)
      distrito.setProvider(cweb3.currentProvider)
      let fromObject
      cweb3.eth.getAccounts((error, accounts) => {
        fromObject = {from : accounts[0]}
      })
      try{
        let distritoCRUDInstance = await distritoCRUD.deployed()
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(distritoId, fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let existsEscuela = await distritoInstance.existsEscuela.call(escuelaId, fromObject)
        if(!existsEscuela){
          this.setState({isEscuelaInvalid : true})
        }
      } catch(err){
        this.setState({isEscuelaInvalid : true})
      }
    }

    handleBackDistrito = (event) => {
      this.props.history.push("/distritos/" + this.props.distritoId)
    }


    handleSearchMesa = (event) => {
      if(this.state.mesaId > 0){
        this.props.history.push(this.props.match.url + "/" + this.state.mesaId)
      }
    }

    handleMesa = (evt) => {this.setState({ mesaId : evt.target.value })}

    renderValidEscuela(){
      return (
        <Container>
        <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
        <Form >
          <Header as='h2'> Buscar una mesa</Header>
            <Form.Input
              type="number"
              label='id de la mesa'
              placeholder="id de la mesa"
              value={this.state.mesaId}
              onChange={this.handleMesa.bind(this)}
            />
          <Form.Button content='Buscar' onClick={this.handleSearchMesa.bind(this)}/>
        </Form>
        <Divider/>
        <Button onClick={this.handleBackDistrito}>Volver al distrito</Button>
        <Divider/>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => (
            <Mesas distritoId={this.props.distritoId} escuelaId={this.props.match.params.escuelaId} {...props} />
          )}/>
          <Route path={`${this.props.match.url}/:mesaId`} render={(props) => (
            <Mesa distritoId={this.props.distritoId} escuelaId={this.props.match.params.escuelaId} {...props} />
          )}/>
        </Switch>
        </Container>
      );
    }

    renderInvalidEscuela(){
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> Escuela no valida</Header>
          <Button onClick={this.handleBackDistrito}>Volver a los distritos</Button>
        </Container>
      )
    }

    render () {
        if(this.state.isEscuelaInvalid){
          return this.renderInvalidEscuela();
        } else{
          return this.renderValidEscuela();
        }
    }
}

export default withRouter(Escuela)

// <Route exact path={`${this.props.match.url}`} component={Mesas}/>
// <Route path={`${this.props.match.url}/:mesaId`} component={Mesa}/>
