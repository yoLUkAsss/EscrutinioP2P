import React, { Component } from 'react'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Form, Divider, Header, Table } from 'semantic-ui-react'



import UserContract from '../../build/contracts/User.json'
import UserElectionCRUDContract from '../../build/contracts/UserElectionCRUD.json'

class GetUser extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          correoUsuario : ''
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

    handleGetUser = (event) => {
      event.preventDefault()

      const userElectionCRUD = contract(UserElectionCRUDContract)
      userElectionCRUD.setProvider(this.state.web3.currentProvider)

    }

    render() {
        return (
          <div>
          </div>
        )
    }
}

export default GetMesa2
