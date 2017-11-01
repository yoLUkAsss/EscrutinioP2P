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

class CreateElectionItem extends Component {
    render () {
      if(currentUser.isLogged(cookie) && !currentUser.isElectionCreated(cookie)){
        return (
            <Menu.Item header><Link to="/election">Crear eleccion</Link></Menu.Item>
        );
      } else{
        return null;
      }
    }
}

export default CreateElectionItem
