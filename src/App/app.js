import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'

import CreateAutoridadElectoral from '../prototypes/CreateAutoridadElectoral.js'
import CreateMesa from '../prototypes/CreateMesa.js'

const App = React.createClass({
  render: function() {
    return (
    <div>
      <FixedNavbarComponent/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/create_autoridad_electoral' component={CreateAutoridadElectoral}/>
          <Route path='/create_mesa' component={CreateMesa}/>
        </Switch>
    </div>
  )}
})

export default App
