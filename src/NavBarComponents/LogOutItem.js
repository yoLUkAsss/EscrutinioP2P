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
    constructor() {
        super();
        this.state = {
            web3 : null
        }
    }

    componentWillMount() {
      getWeb3.then(results => {
        this.setState({
          web3: results.web3
        })
      }).catch(() => {
        console.log('Error finding web3.')
      })
    }

    handleLogout = async (event) => {
      event.preventDefault()
      const user = contract(UserContract)
      user.setProvider(this.state.web3.currentProvider)
      let fromObject
      this.state.web3.eth.getAccounts((err, accounts) => {
        fromObject = {from:accounts[0], gas:3000000}
      })
      try{
        let userInstance = await user.at(currentUser.getAddress(cookie))
        await userInstance.logout.sendTransaction(fromObject)
        currentUser.clean(cookie)
        utils.showSuccess(this.msg, "Cierre de sesion exitoso")
        //cambia la url
        this.props.history.push("/")
      } catch(err){
        utils.showError(this.msg, "Fallo en el cierre de session")
      }
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
