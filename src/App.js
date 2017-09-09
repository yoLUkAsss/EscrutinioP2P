import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Nothing yet</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Bienvenido a DEscrutinio!</h1>
              <p>La aplicación se encuentre en sus primeras instancias de desarrollo.</p>
              <p>Con lo cual, aún no es posible utilizar ninguna de los servicios a prestar </p>
              <p>Ante cualquier duda contactarse con <strong>sandoval.lucasj@gmail.com</strong> o <strong>laimejesu@gmail.com</strong></p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
