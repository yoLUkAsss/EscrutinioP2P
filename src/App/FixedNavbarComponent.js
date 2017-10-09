import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'

import cookie from 'react-cookies'

import Logout from '../Auth/logout.js'
import { Link } from 'react-router-dom'

class FixedNavbarComponent extends Component {

  componentWillMount() {
      console.log("USER: " + cookie.load("current_user_address"))
  }

  render() {

    const isLoggedIn = cookie.load('current_user_address') !== undefined

    let navbar = null

    if (isLoggedIn) {
      navbar = <div>
            <Menu fixed='top' inverted>
                <Menu.Item header><Link to="/">Home</Link></Menu.Item>
                <Logout/>
            </Menu>
        </div>
    } else {
        navbar = <div>
            <Menu fixed='top' inverted>
                <Menu.Item header><Link to="/">Home</Link></Menu.Item>
                <Menu.Item header><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item header><Link to="/signup">Sign up</Link></Menu.Item>
                <Menu.Item header><Link to="/createae">Create Autoridad Electoral</Link></Menu.Item>
            </Menu>
        </div>
    }


    return (
      <div>
        { navbar }
      </div>
    );
  }
}
export default FixedNavbarComponent
