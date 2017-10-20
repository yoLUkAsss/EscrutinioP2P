import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'
import {Container, Divider, Header, Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

import Distritos from './Distritos.js'
import Distrito from './Distrito.js'

class FullDistrito extends Component {

    constructor() {
        super();
        this.state = {
          distritoId : 0
        }
    }

    handleSearchDistrito = (event) => {
      if(this.state.distritoId > 0){
        this.props.history.push(this.props.match.url + "/" + this.state.distritoId)
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
            <Route exact path={`${this.props.match.url}`} component={Distritos}/>
            <Route path={`${this.props.match.url}/:distritoId`} component={Distrito}/>
          </Switch>
        </Container>
        </div>
        )
    }
}
export default withRouter(FullDistrito)
