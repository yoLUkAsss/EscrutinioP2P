import React, { Component } from 'react'

import cookie from 'react-cookies'
import {Switch, Route, Link, withRouter} from 'react-router-dom'
import { Container, List, Divider, Header} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

import * as currentUser from '../utils/user_session.js'

import NoTask from './NoTask.js'
import CreateDistrito from '../UserActionComponents/CreateDistrito.js'
import CreateEscuela from '../UserActionComponents/CreateEscuela.js'
import SetApoderado from '../UserActionComponents/SetApoderado.js'
import SetDelegadoDeDistrito from '../UserActionComponents/SetDelegadoDeDistrito.js'
import SetDelegadoDeEscuela from '../UserActionComponents/SetDelegadoDeEscuela.js'
import SetPresidenteDeMesa from '../UserActionComponents/SetPresidenteDeMesa.js'
import SetVicepresidenteDeMesa from '../UserActionComponents/SetVicepresidenteDeMesa.js'
import SetFiscal from '../UserActionComponents/SetFiscal.js'
import CompleteMesa from '../UserActionComponents/CompleteMesa.js'
import LoadMesa from '../UserActionComponents/LoadMesa.js'
import Error404 from '../ErrorComponents/Error404.js'

class Task extends Component {
  componentWillMount(){
    this.tasks = currentUser.getTasks(cookie)
  }
  renderTasks(){
    return (
      <Container text>
        <List>
          {
            this.tasks.all.map((task, idT) => {
              return (
                <List.Item key={idT}>
                  <Link to={this.props.match.url+task.url}>{task.name}</Link>
                </List.Item>
              )
            })
          }
        </List>
      </Container>
    )
  }

  render() {
      return (
          <Container text>
            <Header as='h2'>{this.tasks.name}</Header>
            {this.renderTasks()}
            <Divider/>
            <Switch>
              <Route exact path={`${this.props.match.url}`} component={NoTask}/>
              <Route path={`${this.props.match.url}/distrito`} component={CreateDistrito}/>
              <Route path={`${this.props.match.url}/escuela`} component={CreateEscuela}/>
              <Route path={`${this.props.match.url}/asignarapoderado`} component={SetApoderado}/>
              <Route path={`${this.props.match.url}/asignarfiscal`} component={SetFiscal}/>
              <Route path={`${this.props.match.url}/asignardelegadodistrito`} component={SetDelegadoDeDistrito}/>
              <Route path={`${this.props.match.url}/asignardelegadoescuela`} component={SetDelegadoDeEscuela}/>
              <Route path={`${this.props.match.url}/asignarpresidente`} component={SetPresidenteDeMesa}/>
              <Route path={`${this.props.match.url}/asignarvicepresidente`} component={SetVicepresidenteDeMesa}/>
              <Route path={`${this.props.match.url}/completarmesa`} component={CompleteMesa}/>
              <Route path={`${this.props.match.url}/cargar`} component={LoadMesa}/>
              <Route component={Error404}/>
            </Switch>
          </Container>
      );
  }
}

export default withRouter(Task)
