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
  // <Menu.Item header><Link to="/election">Crear eleccion</Link></Menu.Item>
  //<Menu.Item as={Link} to="/election" name='registrar' active={this.props.activeItem} onClick={this.props.activate}>Crear eleccion</Menu.Item>
    render () {
      if(this.props.canCreate){
        return (
            <Menu.Item as={Link} to="/eleccion" name='eleccion' active={this.props.activeItem} onClick={this.props.activate}>
              Eleccion
            </Menu.Item>
        );
      } else{
        return null;
      }
    }
}

export default CreateElectionItem
