import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Divider} from 'semantic-ui-react'
import cookie from 'react-cookies'

import Home from './Home.js'
import Election from './Election.js'
import Task from './Task.js'
import SearchMesa from '../UserActionComponents/SearchMesa.js'
import Guide from './Guide.js'
import About from './About.js'

import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'

import Navbar from './NavBar.js'

import Error404 from '../ErrorComponents/Error404.js'

class App extends Component{
  render() {
    return (
      <div>
      <Container text>
        <Navbar/>
      </Container>
      <Divider/>
      <Container text>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/eleccion' component={Election}/>
          <Route path='/tareas' component={Task}/>
          <Route path='/mesas' component={SearchMesa}/>
          <Route path='/guia' component={Guide}/>
          <Route path='/about' component={About}/>


          <Route path='/acceder' component={Login}/>
          <Route path='/registrar' component={Signup}/>
          <Route component={Error404}/>
        </Switch>
      </Container>
    </div>
    )
  }
}

export default App
