import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'

import cookie from 'react-cookies'

// import Logout from '../Auth/logout.js'
import { Link, withRouter} from 'react-router-dom'

/**
 * Navbar Components
 */
import CreateElectionItem from '../NavBarComponents/CreateElectionItem.js'
import LogInItem from '../NavBarComponents/LogInItem.js'
import SignUpItem from '../NavBarComponents/SignUpItem.js'
import LogOutItem from '../NavBarComponents/LogOutItem.js'
// import ResultsItem from '../NavBarComponents/ResultsItem.js'
import TaskItem from '../NavBarComponents/TaskItem.js'

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

  getTasks(){
    return currentUser.getTasks(cookie).all
  }

  getCanCreateElection(){
    return currentUser.isLogged(cookie) && !currentUser.isElectionActive(cookie)
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
        <CreateElectionItem activeItem={this.state.activeItem === 'eleccion'} activate={this.handleItemClick.bind(this)} canCreate={this.getCanCreateElection()}/>

        <TaskItem activeItem={this.state.activeItem} activate={this.handleItemClick.bind(this)} tasks={this.getTasks()}/>

        <Menu.Item as={Link} to="/resultados" name='resultados' active={this.state.activeItem === 'resultados'} onClick={this.handleItemClick}>
          Resultados
        </Menu.Item>

        <Menu.Item as={Link} to="/guia" name='guia' active={this.state.activeItem === 'guia'} onClick={this.handleItemClick}>
          Guia
        </Menu.Item>
        <Menu.Item as={Link} to="/nosotros" name='nosotros' active={this.state.activeItem === 'nosotros'} onClick={this.handleItemClick}>
          About
        </Menu.Item>
        <Menu.Menu position='right'>
          <SignUpItem activeItem={this.state.activeItem === 'registrar'} activate={this.handleItemClick.bind(this)}/>
          <LogInItem activeItem={this.state.activeItem === 'acceder'} activate={this.handleItemClick.bind(this)}/>
          <LogOutItem/>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default withRouter(NavBar)
// <Menu.Item as={Link} to="/tareas" name='tareas' active={this.state.activeItem === 'tareas'} onClick={this.handleItemClick}>
//   Tareas
// </Menu.Item>
// <Menu.Item as={Link} to="/mesas" name='mesas' active={this.state.activeItem === 'mesas'} onClick={this.handleItemClick}>
//   Mesas
// </Menu.Item>
// <ResultsItem activeItem={this.state.activeItem === 'resultados'} activate={this.handleItemClick.bind(this)}/>
