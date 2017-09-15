import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import App from './App.js'
import About from './About.js'
import Home from './Home.js'
import Tabla from './Tabla.js'
import MesaForm from './MesaForm.js'
import MesaDataLoadForm from './MesaDataLoadForm.js'
import Error404 from './ErrorComponents/Error404.js'
import SearchMesa from './SearchComponents/SearchMesa.js'

import './ErrorComponents/Error404.css'

ReactDOM.render(
  <Router>
      <div>
        <Switch>

          {/* Paths for Router React */}
          <Route exact path="/" component={Home}/>
          
          <Route exact path="/app" component={App}/>
          <Route exact path="/mesa" component={MesaForm}/> 
          <Route exact path="/about" component={About}/>
          <Route exact path="/tabla" component={Tabla}/>
          <Route exact path="/loadMesa" component={MesaDataLoadForm}/>
          <Route exact path="/searchMesa" component={SearchMesa}/>

          {/* Final matches every other path - renders Error 404 not found */}
          <Route component={Error404} />
        </Switch>
      </div>
  </Router>,
  document.getElementById('root')
);