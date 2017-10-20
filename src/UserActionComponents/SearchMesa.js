// react utilities
import React, { Component } from 'react';
import { Form, Header, Container, Divider} from 'semantic-ui-react'
import {withRouter, Switch, Route} from 'react-router-dom'
import AlertContainer from 'react-alert'

// componentes
import TotalMesas from '../App/TotalMesas.js'
import Mesa from '../App/Mesa.js'

// Utils
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'

// Contracts

class SearchMesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          web3 : null
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

    handleSearchMesa = (event) => {
      this.props.history.push(this.props.match.url + "/" + this.state.distritoId + "/" + this.state.escuelaId + "/" + this.state.mesaId)
    }

    render () {
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Form >
              <Header as='h2'> Buscar mesa</Header>
                <Form.Input
                    type="number"
                    label='id del distrito'
                    placeholder="id del distrito"
                    value={this.state.distritoId}
                    onChange={(evt) => {this.setState({ distritoId : evt.target.value })}}
                />
                <Form.Input
                    type="number"
                    label='id de la escuela'
                    placeholder="id de la escuela"
                    value={this.state.escuelaId}
                    onChange={(evt) => {this.setState({ escuelaId : evt.target.value })}}
                />
                <Form.Input
                    type="number"
                    label='id de la Mesa'
                    placeholder="id de la Mesa"
                    value={this.state.mesaId}
                    onChange={(evt) => {this.setState({ mesaId : evt.target.value })}}
                />
              <Form.Button content='Buscar' onClick={this.handleSearchMesa.bind(this)}/>
          </Form>
          <Divider/>
          <Switch>
            <Route exact path={`${this.props.match.url}`} component={TotalMesas}/>
            <Route path={`${this.props.match.url}/:distritoId/:escuelaId/:mesaId`} component={Mesa}/>
          </Switch>
        </Container>
      );
    }
}

export default withRouter(SearchMesa)
