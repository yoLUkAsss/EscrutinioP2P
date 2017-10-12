import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'

import CreateElection from '../UserActionComponents/CreateElection.js'
// import CreateMesa from '../UserActionComponents/CreateMesa.js'
import SearchMesa from '../UserActionComponents/SearchMesa.js'

import SetPresidenteDeMesa from '../UserActionComponents/SetPresidenteDeMesa.js'
import SetFiscal from '../UserActionComponents/SetFiscal.js'

// import Mesas from './Mesas.js'
// import Mesa from './Mesa.js'
import FullMesa from './FullMesa.js'


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
          <Route path='/mesas' component={FullMesa}/>
          <Route path='/setpresidente' component={SetPresidenteDeMesa}/>
          <Route path='/setfiscal' component={SetFiscal}/>
          <Route path='/loadmesa' component={SearchMesa}/>
        </Switch>
    </div>
    )
  }
}

export default App
