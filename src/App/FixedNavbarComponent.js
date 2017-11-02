import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'

import cookie from 'react-cookies'

// import Logout from '../Auth/logout.js'
import { Link } from 'react-router-dom'

/**
 * Navbar Components
 */
import LogInItem from '../NavBarComponents/LogInItem.js'
import SignUpItem from '../NavBarComponents/SignUpItem.js'
import LogOutItem from '../NavBarComponents/LogOutItem.js'
import CreateElectionItem from '../NavBarComponents/CreateElectionItem.js'

import SetPresidenteItem from '../NavBarComponents/SetPresidenteItem.js'
import SetFiscalItem from '../NavBarComponents/SetFiscalItem.js'
import SetApoderadoItem from '../NavBarComponents/SetApoderadoItem.js'
import SetDelegadoDeDistritoItem from '../NavBarComponents/SetDelegadoDeDistritoItem.js'
import SetDelegadoDeEscuelaItem from '../NavBarComponents/SetDelegadoDeEscuelaItem.js'

import CreateDistritoItem from '../NavBarComponents/CreateDistritoItem.js'
import CreateEscuelaItem from '../NavBarComponents/CreateEscuelaItem.js'

import SearchMesaItem from '../NavBarComponents/SearchMesaItem.js'
import LoadMesaItem from '../NavBarComponents/LoadMesaItem.js'

import * as currentUser from '../utils/user_session.js'

class FixedNavbarComponent extends Component {

  constructor() {
      super()
      this.state = {
          color : "grey"
      }
  }

  componentWillMount() {
      console.log("USER: " + cookie.load("current_user_address"))
      this.forceUpdate()
  }

  getRolIdentifier() {
    return currentUser.identifyRol(cookie)
  }

  render() {
    let navbar =
      <div>
        <Menu fixed='top' inverted color={this.getRolIdentifier()}>
          <Menu.Item header><Link to="/">Home</Link></Menu.Item>
          <LogInItem/>
          <SignUpItem/>
          <LogOutItem/>
          <SearchMesaItem/>
          <LoadMesaItem/>
          <SetApoderadoItem/>
          <SetDelegadoDeDistritoItem/>
          <SetDelegadoDeEscuelaItem/>
          <SetPresidenteItem/>
          <SetFiscalItem/>
          <CreateElectionItem/>
          <CreateDistritoItem/>
          <CreateEscuelaItem/>
        </Menu>
      </div>
    return (
      <div>
        { navbar }
      </div>
    );
  }
}
export default FixedNavbarComponent
