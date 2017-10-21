/**
 * React utilities
 */
import React, { Component } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'
import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'
/**
 * Controller for Component
 */
import contract from 'truffle-contract'
import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'

/**
 * Contracts
*/
import ElectionContract from '../../build/contracts/Election.json'
import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'

class CreateDistrito extends Component {
    constructor() {
        super()
        this.state = {
            numberOfEscuelas : 1,
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

    async handleCreateDistrito(event) {
      event.preventDefault()
      let fromObject
      const election = contract(ElectionContract)
      const distritoCRUD = contract(DistritoCRUDContract)
      distritoCRUD.setProvider(this.state.web3.currentProvider)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      let distritoCRUDinstance = await distritoCRUD.deployed()
      try{
        await electionInstance.createDistrito.sendTransaction(currentUser.getEmail(cookie), fromObject)
        let distritoId = await distritoCRUDinstance.lastDistritoId.call(fromObject)
        let promises = []
        for(let i = 0; i < this.state.numberOfEscuelas; i++){
          promises.push(electionInstance.createEscuela.sendTransaction(currentUser.getEmail(cookie), distritoId, fromObject))
        }
        Promise.all(promises).then(() => {
          utils.showSuccess(this.msg, "Distrito creado correctamente")
        }).catch(error => {
          console.log(error)
          utils.showError(this.msg, "Fallo la creacion del distrito")
        })
      } catch(error){
        utils.showError(this.msg, "Fallo:" + error)
      }
    }

    handleEscuelas = (event) => {
      this.setState({ numberOfEscuelas : event.target.value })
    }

    render () {
        return (
            <Center>
              <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <ComponentTitle title='Crear Distrito'/>
                  <Form>
                    <Form.Input
                        required
                        type='number'
                        label='cantidad de escuelas'
                        placeholder='cantidad de escuelas'
                        value={this.state.numberOfEscuelas}
                        onChange={this.handleEscuelas.bind(this)}
                    />
                    <Button onClick={this.handleCreateDistrito.bind(this)}>
                        Crear Distrito
                    </Button>
                  </Form>
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateDistrito)
