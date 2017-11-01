/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
/**
 * Components
 */

/**
 * Controller for Component
 */
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'

/**
* Contracts
*/
import UserContract from '../../build/contracts/User.json'
import contract from 'truffle-contract'

/**
usa los siguientes props:
* history viene con withRouter

*/
class LogOutItem extends Component {
    handleLogout = (event) => {
      event.preventDefault()
      api.logout(currentUser.getAddress(cookie)).then((res) => {
        currentUser.clean(cookie)
        utils.showSuccess(this.msg, "Cierre de sesion exitoso", () => {this.props.history.push("/")})
      }).catch((err) => {
        // console.log(JSON.stringify(err, undefined, 2))
        utils.showError(this.msg, "Fallo en el cierre de session")
      })
    }
    render () {
      if(currentUser.isLogged(cookie)){
        return (
          <div>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Menu.Item onClick={this.handleLogout.bind(this)}>Cierre de sesion</Menu.Item>
          </div>
        );
      } else {
        return null;
      }
    }
}

export default withRouter(LogOutItem)
