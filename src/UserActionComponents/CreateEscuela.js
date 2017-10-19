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

class CreateEscuela extends Component {
    constructor() {
        super()
        this.state = {
          distritoId : 1,
          escuelaId : 1,
          cantidadMesas : 1,
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

    async handleCreateEscuela(event) {
      event.preventDefault()
      let fromObject
      const election = contract(ElectionContract)
      election.setProvider(this.state.web3.currentProvider)
      this.state.web3.eth.getAccounts((err, accs) => {
        fromObject = {from:accs[0], gas : 3000000}
      })
      let electionInstance = await election.deployed()
      try{
        let promises = []
        for(let i = 0; i < this.state.cantidadMesas; i++){
          promises.push(await electionInstance.createMesa.sendTransaction(currentUser.getEmail(cookie), this.state.distritoId, this.state.escuelaId, fromObject))
        }
        Promise.all(promises).then(() => {
          utils.showSuccess(this.msg, "Escuela creada correctamente")
        }).catch(error => {
          console.log(error)
          utils.showError(this.msg, "Fallo la creacion de la escuela")
        })
      } catch(error){
        utils.showError(this.msg, "Fallo:" + error)
      }
    }

    render () {
        return (
            <Center>
              <div>
                <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <ComponentTitle title='Crear Mesas para una escuela'/>
                  <Form>
                    <Form.Input
                        required
                        type='number'
                        label='distrito id'
                        placeholder='distrito id'
                        value={this.state.distritoId}
                        onChange={ (event) => {
                          this.setState({ distritoId : event.target.value })
                          }
                        }
                    />
                    <Form.Input
                        required
                        type='number'
                        label='escuela id'
                        placeholder='escuela id'
                        value={this.state.escuelaId}
                        onChange={ (event) => {
                          this.setState({ escuelaId : event.target.value })
                          }
                        }
                    />
                    <Form.Input
                        required
                        type='number'
                        label='cantidad de mesas'
                        placeholder='cantidad de mesas'
                        value={this.state.cantidadMesas}
                        onChange={ (event) => {
                          this.setState({ cantidadMesas : event.target.value })
                          }
                        }
                    />
                    <Button onClick={this.handleCreateEscuela.bind(this)}>
                        Crear Mesas
                    </Button>
                  </Form>
                </Container>
              </div>
            </Center>
        );
    }
}

export default withRouter(CreateEscuela)
