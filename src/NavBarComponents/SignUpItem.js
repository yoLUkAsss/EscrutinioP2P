/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

/**
 * Components
 */
/**
 * Controller for Component
 */
import cookie from 'react-cookies'
import * as currentUser from '../utils/user_session.js'

class SignUpItem extends Component {
  // <Menu.Item header><Link to="/signup">Registro</Link></Menu.Item>
    render () {
      if(!currentUser.isLogged(cookie)){
        return (
            <Menu.Item as={Link} to="/registrar" name='registrar' active={this.props.activeItem} onClick={this.props.activate}>
              Registrar
            </Menu.Item>
        );
      } else{
        return null;
      }
    }
}

export default SignUpItem
