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

class SearchMesa extends Component {
    render () {
      if(currentUser.isLogged(cookie)){
        return (
            <Menu.Item header><Link to="/mesas">Ver mesas</Link></Menu.Item>
        );
      } else{
        return null;
      }
    }
}

export default SearchMesa
