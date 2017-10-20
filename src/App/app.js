import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'
import CreateElection from '../UserActionComponents/CreateElection.js'
import SetPresidenteDeMesa from '../UserActionComponents/SetPresidenteDeMesa.js'
import SetFiscal from '../UserActionComponents/SetFiscal.js'
import CreateDistrito from '../UserActionComponents/CreateDistrito.js'
import CreateEscuela from '../UserActionComponents/CreateEscuela.js'
import FullDistrito from './FullDistrito.js'


class App extends Component{
  render() {
    return (
    <div>
      <FixedNavbarComponent/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/election' component={CreateElection}/>
          <Route path='/distritos' component={FullDistrito}/>
          <Route path='/distrito' component={CreateDistrito}/>
          <Route path='/escuela' component={CreateEscuela}/>
          <Route path='/setpresidente' component={SetPresidenteDeMesa}/>
          <Route path='/setfiscal' component={SetFiscal}/>
        </Switch>
    </div>
    )
  }
}

export default App
