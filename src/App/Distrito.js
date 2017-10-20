// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Container, Divider} from 'semantic-ui-react'
import {withRouter, Switch, Route} from 'react-router-dom'
import AlertContainer from 'react-alert'

// Utils
import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'

// Contracts
import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
import Escuelas from './Escuelas.js'
import Escuela from './Escuela.js'

class Distrito extends Component {
    constructor(props) {
        super(props)
        this.state = {
          escuelaId : 0,
          isDistritoInvalid : false
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.handleGetDistrito(results.web3, this.props.match.params.distritoId)
        this.setState({
          web3: results.web3
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
    }

    handleGetDistrito = async (cweb3, distritoId) => {
      const distritoCRUD = contract(DistritoCRUDContract)
      distritoCRUD.setProvider(cweb3.currentProvider)
      let fromObject
      cweb3.eth.getAccounts((error, accounts) => {
        fromObject = {from : accounts[0]}
      })
      try{
        let distritoCRUDInstance = await distritoCRUD.deployed()
        let existsDistrito = await distritoCRUDInstance.existsDistrito.call(distritoId, fromObject)
        if(!existsDistrito){
          this.setState({isDistritoInvalid : true})
        }
      } catch(err){
        console.log(err)
        this.setState({isDistritoInvalid : true})
      }
    }


    handleSearchEscuela = (event) => {
      if(this.state.escuelaId > 0){
        this.props.history.push(this.props.match.url + "/" + this.state.escuelaId)
      }
    }

    handleBackDistritos = (event) => {
      this.props.history.push("/distritos")
    }

    renderValidDistrito(){
      return (
        <Container>
        <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
        <Form >
          <Header as='h2'> Buscar una escuela</Header>
            <Form.Input
              type="number"
              label='id de la escuela'
              placeholder="id de la escuela"
              value={this.state.escuelaId}
              onChange={(evt) => {this.setState({ escuelaId : evt.target.value })}}
            />
          <Form.Button content='Buscar' onClick={this.handleSearchEscuela.bind(this)}/>
        </Form>
        <Divider/>
          <Button onClick={this.handleBackDistritos}> Volver a los distritos</Button>
        <Divider/>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => (
            <Escuelas distritoId={this.props.match.params.distritoId} {...props} />
          )}/>
          <Route path={`${this.props.match.url}/:escuelaId`} render={(props) => (
            <Escuela distritoId={this.props.match.params.distritoId} {...props} />
          )}/>
        </Switch>
        </Container>
      );
    }

    renderInvalidDistrito(){
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> Distrito no valido</Header>
          <Button onClick={this.handleBackDistritos}> Volver a los distritos</Button>
        </Container>
      )
    }

    render () {
        if(this.state.isDistritoInvalid){
          return this.renderInvalidDistrito();
        } else{
          return this.renderValidDistrito();
        }
    }
}

export default withRouter(Distrito)

// <Route exact path={`${this.props.match.url}`} component={Escuelas}/>
// <Route path={`${this.props.match.url}/:escuelaId`} component={Escuela}/>
