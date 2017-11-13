/**
 * React utilities
 */
import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import * as currentUser from '../utils/user_session.js'

//agregar el dropdown y sus links, eliminar component task
class TaskItem extends Component {

  render () {
    if(currentUser.isLogged(cookie)){
        return (
          <Dropdown text='Tareas' pointing className='link item'>
            <Dropdown.Menu>
              {
                this.props.tasks.map((task, idT) => {
                  return (
                    <Dropdown.Item key={idT} as={Link} name={task.name} active={this.props.activeItem === task.name} to={task.url} onClick={this.props.activate}>
                      {task.name}
                    </Dropdown.Item>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        )
    } else {
      return (null)
    }
  }
}

export default withRouter(TaskItem)
