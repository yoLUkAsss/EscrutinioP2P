import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import App from './App.js'
import About from './About.js'
import Home from './Home.js'

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
          <Route exact path="/mesa" component={SearchMesa}/> 
          <Route exact path="/about" component={About}/>
          



          {/* Final matches every other path - renders Error 404 not found */}
          <Route component={Error404} />
        </Switch>
      </div>
  </Router>,
  document.getElementById('root')
);