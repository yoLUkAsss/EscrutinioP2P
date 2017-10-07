import cookie from 'react-cookies'

import React, { Component } from 'react';
import UserCRUD from '../../build/contracts/UserCRUD.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract'

let AuthHomeController = {

    showData : (event, data) => {
        event.preventDefault()
        alert(JSON.stringify(data, undefined, 2))


        let userCrudInstance
        const userCrud = contract(UserCRUD)
        userCrud.setProvider(this.state.web3.currentProvider)
        this.state.web3.eth.getAccounts((error, accounts) => {

            userCrud.deployed().then( (userCrudInstance) => {
                
                return 

            })


        })
    
    
    
    }
}

export default AuthHomeController
