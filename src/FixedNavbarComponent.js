import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'

import cookie from 'react-cookies'

class FixedNavbarComponent extends Component {

  componentWillMount() {
      console.log("USER: " + cookie.load("current_user_address"))
  }

  render() {

    const isLoggedIn = cookie.load('current_user_address') !== ""

    let navbar = null

    if (isLoggedIn) {
      navbar = <div>
            <Menu fixed='top' inverted>
                <Menu.Item as='a' href='/' header>Home</Menu.Item>
                <Menu.Item as='a' href='/logout' header>Logout</Menu.Item>
            </Menu>
        </div>
    } else {
        navbar = <div>
            <Menu fixed='top' inverted>
                <Menu.Item as='a' href='/' header>Home</Menu.Item>
                <Menu.Item as='a' href='/login' header>Login</Menu.Item>
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
