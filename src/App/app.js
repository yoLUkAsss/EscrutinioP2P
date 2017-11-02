import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'

// import cookie from 'react-cookies'

import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'
import CreateElection from '../UserActionComponents/CreateElection.js'
import SetPresidenteDeMesa from '../UserActionComponents/SetPresidenteDeMesa.js'
import SetFiscal from '../UserActionComponents/SetFiscal.js'
import CreateDistrito from '../UserActionComponents/CreateDistrito.js'
import CreateEscuela from '../UserActionComponents/CreateEscuela.js'
import SearchMesa from '../UserActionComponents/SearchMesa.js'
import LoadMesa from '../UserActionComponents/LoadMesa.js'
import SetApoderado from '../UserActionComponents/SetApoderado.js'
import SetDelegadoDeDistrito from '../UserActionComponents/SetDelegadoDeDistrito.js'
import SetDelegadoDeEscuela from '../UserActionComponents/SetDelegadoDeEscuela.js'

import Error404 from '../ErrorComponents/Error404.js'
import '../ErrorComponents/Error404.css'

// import * as currentUser from '../utils/user_session.js'
// import * as api from '../utils/api-call.js'


/**
 * Contracts
*/
// import ElectionContract from '../../build/contracts/Election.json'


class App extends Component{

  // constructor() {
  //   super()
  // }

  // componentWillMount() {
  //   currentUser.setElectionCreated(cookie, false)
  //    api.isCreated().then( result => {
  //      currentUser.setElectionCreated(cookie, result)
  //    }).catch(err => {
  //      currentUser.setElectionCreated(cookie, false)
  //    })
  // }

  render() {
    return (
    <div>
      <FixedNavbarComponent/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/election' component={CreateElection}/>
          <Route path='/mesas' component={SearchMesa}/>
          <Route path='/loadmesa' component={LoadMesa}/>
          <Route path='/distrito' component={CreateDistrito}/>
          <Route path='/escuela' component={CreateEscuela}/>
          <Route path='/setpresidente' component={SetPresidenteDeMesa}/>
          <Route path='/setfiscal' component={SetFiscal}/>
          <Route path='/setapoderado' component={SetApoderado}/>
          <Route path='/setdelegadodistrito' component={SetDelegadoDeDistrito}/>
          <Route path='/setdelegadoescuela' component={SetDelegadoDeEscuela}/>
          <Route component={Error404}/>
        </Switch>
    </div>
    )
  }
}

export default App
