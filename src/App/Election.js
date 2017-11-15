/**
 * React utilities
 */
import React, { Component } from 'react'
import { Grid, Container, Divider, Button, Form, Dimmer, Loader, Header } from 'semantic-ui-react'
// import Center from 'react-center'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'
// import Files from 'react-files'

// import ReactFileReader from 'react-file-reader';

/**
 * Components
 */
// import ComponentTitle from '../utils/ComponentTitle.js'
import RefactoredDLF from '../utils/RDLF.js'
/**
 * Controller for Component
 */
// import contract from 'truffle-contract'
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'

/**
 * Contracts
*/
// import ElectionContract from '../../build/contracts/Election.json'

class Election extends Component {
    constructor() {
        super()
        this.state = {
            candidates : [],
            dataFile : null
        }
        this.uploadFile = this.uploadFile.bind(this)
      }
    uploadFile(event){
      event.preventDefault()
      this.setState({dataFile : event.target.files[0]})
    }
    handleCreateElection(event){
      event.preventDefault()
      if (this.state.dataFile !== null) {
        let data = new FormData()
        data.append('file', this.state.dataFile)
        data.append('email', currentUser.getEmail(cookie))
        data.append('candidates', this.state.candidates.map((candidate) => {
          return candidate.name
        }))
        api.initElectionByCSV(data).then((res) => {
          currentUser.setElectionCreated(cookie, true)
          console.log(res.data)
          utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
        }).catch(error => {
          console.log(error)
          utils.showError(this.msg, error.response.data)
        })
      } else {
        utils.showError(this.msg, "Debes agregar informacion de los distritos/escuelas/mesas")
      }
    }
    handleNewCandidates = (newCandidates) => {
      this.setState({candidates : newCandidates})
    }
    renderFileReader = () => {
      return (
            <div>
              <span>
                <input type="file"
                name="electionFile"
                accept="text/csv"
                onChange={this.uploadFile} />
              </span>
            </div>
             )
    }
    render () {
        return (
          <div>
            <Header as='h2'>Crear Eleccion con los siguientes candidatos</Header>
            <Grid centered>
              <Grid.Column stretched>
              <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
                <Container>
                  <Form>
                    <RefactoredDLF
                      title='Candidatos'
                      type='text'
                      placeholder='Nombre de Candidato'
                      onChange={this.handleNewCandidates}
                      items={this.state.candidatos}
                      add={"Agregar Candidato"}
                      del={"Eliminar Candidato"}
                    />
                    <Divider hidden />
                    <Button basic positive floated="left" onClick={this.handleCreateElection.bind(this)}>
                        Crear Eleccion
                    </Button>
                  </Form>
                </Container>
              </Grid.Column>
            </Grid>
            {
              this.renderFileReader()
            }
          </div>
        );
    }
}

export default withRouter(Election)

// api.initElection(currentUser.getEmail(cookie), this.state.candidates.map(x => {return x.name})).then((res) => {
//   currentUser.setElectionCreated(cookie, true)
//   currentUser.setCategory(cookie, "0")
//   utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion, por favor vuelve a logear para ver los cambios")
//   this.props.history.push("/")
// }).catch(error => {
//   console.log(error)
//   utils.showError(this.msg, error.response.data)
// })
