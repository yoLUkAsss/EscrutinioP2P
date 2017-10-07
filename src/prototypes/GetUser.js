import React, { Component } from 'react'

import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

import {Header, List, Button } from 'semantic-ui-react'

import UserElectionCRUDContract from '../../build/contracts/UserElectionCRUD.json'

class GetUser extends Component {

    constructor() {
        super();
        this.state = {
          web3 : null,
          usuarios : []
        }
        this.handleGetUsers = this.handleGetUsers.bind(this)
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

    handleGetUsers = (event) => {
      event.preventDefault()
      let crudInstance
      var promises = []
      let res = []
      const realThis = this
      const userElectionCRUD = contract(UserElectionCRUDContract)
      userElectionCRUD.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((error, accounts) => {
          userElectionCRUD.deployed().then((instance) => {
              crudInstance = instance
              return crudInstance.getUsers.call({from:accounts[0]})
          }).then((usersId) => {
              promises = usersId.map((userId) => {
                  return crudInstance.getUser.call(userId.toNumber(), {from : accounts[0]})
              })
          }).then(() => {
              Promise.all(promises).then(function(data){
                  for(let i = 0; i < data.length; i++){
                      res.push(data[i])
                  }
                  realThis.setState({usuarios : res})
              }).catch(reason => {
                  console.log(reason)
              })
          })
      })
    }

    render() {
        return (
          <div>
          <Header as='h3'>Get lista de usuarios</Header>
          <Button onClick={this.handleGetUsers}>Get users</Button>
          <Header as='h3'>Lista de usuarios</Header>
          <List as='ul'>
              {this.state.usuarios.map((item, idItem) => (
                <List.Item as='li'>{item}</List.Item>
              ))}
          </List>
          </div>
        )
    }
}

export default GetUser
