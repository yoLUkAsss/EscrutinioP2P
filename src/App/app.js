import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'

import CreateAutoridadElectoral from '../prototypes/CreateAutoridadElectoral.js'

const App = React.createClass({
  render: function() {
    return (
    <div>
      <FixedNavbarComponent/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/createae' component={CreateAutoridadElectoral}/>
        </Switch>
    </div>
  )}
})

export default App
