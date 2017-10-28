import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'

import cookie from 'react-cookies'

import Home from './Home.js'
import Login from '../Auth/login.js'
import Signup from '../Auth/signup.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'
import CreateElection from '../UserActionComponents/CreateElection.js'
import SetPresidenteDeMesa from '../UserActionComponents/SetPresidenteDeMesa.js'
import SetFiscal from '../UserActionComponents/SetFiscal.js'
import CreateDistrito from '../UserActionComponents/CreateDistrito.js'
import CreateEscuela from '../UserActionComponents/CreateEscuela.js'
import SearchMesa from '../UserActionComponents/SearchMesa.js'
import SetApoderado from '../UserActionComponents/SetApoderado.js'
import SetDelegadoDeDistrito from '../UserActionComponents/SetDelegadoDeDistrito.js'
import SetDelegadoDeEscuela from '../UserActionComponents/SetDelegadoDeEscuela.js'

import Error404 from '../ErrorComponents/Error404.js'
import '../ErrorComponents/Error404.css'

import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as currentUser from '../utils/user_session.js'

/**
 * Contracts
*/
import ElectionContract from '../../build/contracts/Election.json'


class App extends Component{

  constructor() {
    super()
    this.state = {
        web3 : null
    }
  }

  async componentWillMount() {
    currentUser.setElectionCreated(cookie, false)
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
    }).catch(() => {
      console.log('Error finding web3.')
    })
    let fromObject
    const election = contract(ElectionContract)
    election.setProvider(this.state.web3.currentProvider)
    this.state.web3.eth.getAccounts((err, accs) => {
      fromObject = {from:accs[0], gas : 3000000}
    })
    let electionInstance = await election.deployed()
    let isCreated = await electionInstance.isCreated.call(currentUser.getEmail(cookie), fromObject)
    currentUser.setElectionCreated(cookie, isCreated)
  }

  render() {
    return (
    <div>
      <FixedNavbarComponent/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/election' component={CreateElection}/>
          <Route path='/mesas' component={SearchMesa}/>
          <Route path='/distrito' component={CreateDistrito}/>
          <Route path='/escuela' component={CreateEscuela}/>
          <Route path='/setpresidente' component={SetPresidenteDeMesa}/>
          <Route path='/setfiscal' component={SetFiscal}/>
          <Route path='/setapoderado' component={SetApoderado}/>
          <Route path='/setdelegadodistrito' component={SetDelegadoDeDistrito}/>
          <Route path='/setdelegadoescuela' component={SetDelegadoDeEscuela}/>
          <Route component={Error404}/>
        </Switch>
    </div>
    )
  }
}

export default App
