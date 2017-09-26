import React, { Component } from 'react'
import Election from './Election.js'

import 'semantic-ui-css/semantic.min.css'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

//useful functions
//console.log(JSON.stringify(json, undefined, 2))
//this.state.web3.toAscii(x)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
    }
  }
  

  render() {
    return (
      <div>
        <Election/>
        {/* <p>
          Direccion de la eleccion:<br/>
          {this.state.depAddress}
        </p> */}
      </div>
    );
  }
}

export default App
