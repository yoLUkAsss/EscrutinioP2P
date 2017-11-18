import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Divider} from 'semantic-ui-react'

import Home from './Home.js'
import Election from './Election.js'
import Task from './Task.js'
import SearchResults from '../UserActionComponents/SearchResults.js'
import Guide from './Guide.js'
import About from './About.js'

import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'

import Navbar from './NavBar.js'
import Footer from './Footer.js'

import Error404 from '../ErrorComponents/Error404.js'


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

//removed text in container navbar
class App extends Component{
  render() {
    return (
      <div>
      <Container>
        <Navbar/>
      </Container>
      <Divider/>
      <Container text style={{marginTop: '1em', marginBottom: '2em'}}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/eleccion' component={Election}/>
          <Route path='/tareas' component={Task}/>
          <Route path='/resultados' component={SearchResults}/>
          <Route path='/guia' component={Guide}/>
          <Route path='/about' component={About}/>


          <Route path='/acceder' component={Login}/>
          <Route path='/registrar' component={Signup}/>


          <Route path={'/distrito'} component={CreateDistrito}/>
          <Route path={'/escuela'} component={CreateEscuela}/>
          <Route path={'/asignarapoderado'} component={SetApoderado}/>
          <Route path={'/asignarfiscal'} component={SetFiscal}/>
          <Route path={'/asignardelegadodistrito'} component={SetDelegadoDeDistrito}/>
          <Route path={'/asignardelegadoescuela'} component={SetDelegadoDeEscuela}/>
          <Route path={'/asignarpresidente'} component={SetPresidenteDeMesa}/>
          <Route path={'/asignarvicepresidente'} component={SetVicepresidenteDeMesa}/>
          <Route path={'/completarmesa'} component={CompleteMesa}/>
          <Route path={'/cargar'} component={LoadMesa}/>

          <Route component={Error404}/>
        </Switch>
      </Container>
      <Footer/>
    </div>
    )
  }
}

export default App
