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

class ResultsItem extends Component {
    render () {
      // if(currentUser.isLogged(cookie) && currentUser.isElectionActive(cookie)){
      if(currentUser.isLogged(cookie)){
        return (
            <Menu.Item as={Link} to="/resultados" name='resultados' active={this.props.activeItem} onClick={this.props.activate}>
              Resultados
            </Menu.Item>
        );
      } else{
        return null;
      }
    }
}

export default ResultsItem
