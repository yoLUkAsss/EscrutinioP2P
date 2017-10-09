/**
 * React utilities
 */
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

/**
 * Components
 */
/**
 * Controller for Component
 */
import UserContract from '../../build/contracts/User.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import cookie from 'react-cookies'
import AlertContainer from 'react-alert'
import * as utils from '../utils/utils.js'

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            web3 : null
        }
        this.handleLogout = this.handleLogout.bind(this)
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

    handleLogout = (event) => {
      event.preventDefault()
      const user = contract(UserContract)
      user.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
        user.at(cookie.load("current_user_address")).then((instance) => {
          return instance.logout.sendTransaction({from:accounts[0], gas : 3000000})
        }).then((tx)=> {
          cookie.remove("current_user_email")
          cookie.remove("current_user_address")
          cookie.remove("current_user_category")
          utils.showSuccess(this.msg, "Cierre de sesion exitoso")
        }).catch((reason) => {
          console.log(reason)
          utils.showError(this.msg, "Fallo en el cierre de session")
        })
      })
    }
    render () {
        return (
          <div>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Menu.Item name='log out' onClick={this.handleLogout}/>
          </div>
        );
    }
}

export default Logout
