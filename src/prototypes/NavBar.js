import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'

import cookie from 'react-cookies'

// import Logout from '../Auth/logout.js'
import { Link, withRouter} from 'react-router-dom'

/**
 * Navbar Components
 */
// import LogInItem from '../NavBarComponents/LogInItem.js'
import LogOutItem from '../NavBarComponents/LogOutItem.js'
import * as currentUser from '../utils/user_session.js'

class NavBar extends Component {

  constructor() {
      super()
      this.state = {
        activeItem : 'home',
        color : "grey"
      }
  }

  componentWillMount() {
      this.forceUpdate()
  }

  getRolIdentifier() {
    return currentUser.identifyRol(cookie)
  }

  handleItemClick = (e, {name}) => {
    this.setState({activeItem : name})
  }

  render() {
    return (
      <Menu stackable pointing secondary color={this.getRolIdentifier()}>
        <Menu.Item as={Link} to="/" name='inicio' active={this.state.activeItem === 'inicio'} onClick={this.handleItemClick}>
          Inicio
        </Menu.Item>
        <Menu.Item as={Link} to="/eleccion" name='eleccion' active={this.state.activeItem === 'eleccion'} onClick={this.handleItemClick}>
          Eleccion
        </Menu.Item>
        <Menu.Item as={Link} to="/tareas" name='tareas' active={this.state.activeItem === 'tareas'} onClick={this.handleItemClick}>
          Tareas
        </Menu.Item>
        <Menu.Item as={Link} to="/mesas" name='mesas' active={this.state.activeItem === 'mesas'} onClick={this.handleItemClick}>
          Mesas
        </Menu.Item>
        <Menu.Item as={Link} to="/guia" name='guia' active={this.state.activeItem === 'guia'} onClick={this.handleItemClick}>
          Guia
        </Menu.Item>
        <Menu.Item as={Link} to="/about" name='about' active={this.state.activeItem === 'about'} onClick={this.handleItemClick}>
          About
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/registrar" name='registrar' active={this.state.activeItem === 'registrar'} onClick={this.handleItemClick}>
            Registrar
          </Menu.Item>
          <Menu.Item as={Link} to="/acceder" name='acceder' active={this.state.activeItem === 'acceder'} onClick={this.handleItemClick}>
            Acceder
          </Menu.Item>
          <LogOutItem/>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default withRouter(NavBar)
