/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import * as api from '../utils/api-call.js'
import * as currentUser from '../utils/user_session.js'
import cookie from 'react-cookies'

class CreateElectionItem extends Component {

  constructor() {
    super()
    this.state = {
      eleccionActiva: false
    }
  }

  componentWillMount() {
    api.getElectionInfo()
    .then( result => {
      console.log("ELECCION INFO " + JSON.stringify(result.data, undefined, 2))
      this.setState({
        eleccionActiva: result.data.created
      })
    })
  }

  render () {
    if( (currentUser.isLogged(cookie)) && (! this.state.eleccionActiva) ) {
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
