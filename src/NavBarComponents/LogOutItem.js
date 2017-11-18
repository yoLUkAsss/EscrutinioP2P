/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
/**
 * Components
 */
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'


class LogOutItem extends Component {
    handleLogout = (event) => {
      event.preventDefault()
      api.logout(currentUser.getAddress(cookie)).then((res) => {
        currentUser.clean(cookie)
        utils.showSuccess(this.msg, res.data, () => {this.props.history.push("/")})
      }).catch((err) => {
        utils.showError(this.msg, err.response.data)
      })
    }
    render () {
      if(currentUser.isLogged(cookie)){
        return (
          <div>
            <Menu.Item as={Link} to="/" onClick={this.handleLogout.bind(this)}>Salir</Menu.Item>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          </div>
        );
      } else {
        return null;
      }
    }
}

export default withRouter(LogOutItem)
