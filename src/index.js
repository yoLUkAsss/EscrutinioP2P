import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import App from './App.js'
import About from './About.js'
import Home from './Home.js'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/app" component={App}/>
      <Route exact path="/about" component={About}/>
    </div>
  </Router>,
  document.getElementById('root')
);