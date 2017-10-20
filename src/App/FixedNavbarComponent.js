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
import MesasItem from '../NavBarComponents/MesasItem.js'
import CreateElectionItem from '../NavBarComponents/CreateElectionItem.js'

import SetPresidenteItem from '../NavBarComponents/SetPresidenteItem.js'
import SetFiscalItem from '../NavBarComponents/SetFiscalItem.js'
import SetApoderadoItem from '../NavBarComponents/SetApoderadoItem.js'


class FixedNavbarComponent extends Component {

  componentWillMount() {
      console.log("USER: " + cookie.load("current_user_address"))
  }

  render() {
    let navbar =
      <div>
        <Menu fixed='top' inverted>
          <Menu.Item header><Link to="/">Home</Link></Menu.Item>
          <LogInItem/>
          <SignUpItem/>
          <LogOutItem/>
          <MesasItem/>
          <SetApoderadoItem/>
          <SetPresidenteItem/>
          <SetFiscalItem/>
          <CreateElectionItem/>
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
