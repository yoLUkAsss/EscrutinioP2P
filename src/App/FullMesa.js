import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'
import {Container, Divider, Header, Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

import Mesas from './Mesas.js'
import Mesa from './Mesa.js'

class FullMesa extends Component {

    constructor() {
        super();
        this.state = {
          mesaId : 0
        }
    }

    handleSearchMesa = (event) => {
      if(this.state.mesaId > 0){
        this.props.history.push(this.props.match.url + "/" + this.state.mesaId)
      }
    }

    render() {
      return (
        <div>
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Form >
              <Header as='h2'> Buscar mesa</Header>
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
            <Route exact path={`${this.props.match.url}`} component={Mesas}/>
            <Route path={`${this.props.match.url}/:mesaId`} component={Mesa}/>
          </Switch>
        </Container>
        </div>
        )
    }
}
export default withRouter(FullMesa)
