import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'
import {Container, Divider, Header, Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

import Mesas from './Mesas.js'
import Mesa from './Mesa.js'

class FullEscuela extends Component {

    constructor() {
        super();
        this.state = {
          escuelaId : 0
        }
    }

    handleSearchEscuela = (event) => {
      if(this.state.escuelaId > 0){
        this.props.history.push(this.props.match.url + "/" + this.state.escuelaId)
      }
    }

    render() {
      return (
        <div>
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Form >
            <Header as='h2'> Buscar un distrito</Header>
              <Form.Input
                type="number"
                label='id del distrito'
                placeholder="id del distrito"
                value={this.state.distritoId}
                onChange={(evt) => {this.setState({ distritoId : evt.target.value })}}
              />
            <Form.Button content='Buscar' onClick={this.handleSearchDistrito.bind(this)}/>
          </Form>
          <Divider/>
          <Switch>
            <Route exact path={`${this.props.match.url}`} component={Escuelas}/>
            <Route path={`${this.props.match.url}/:escuelaId`} component={Escuela}/>
          </Switch>
        </Container>
        </div>
        )
    }
}
export default withRouter(FullEscuela)
