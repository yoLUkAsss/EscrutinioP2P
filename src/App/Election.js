import React, { Component } from 'react'
import { Grid, Container, Button, Form, Header, Loader } from 'semantic-ui-react'
import AlertContainer from 'react-alert'
import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

import RefactoredDLF from '../utils/RDLF.js'
import * as utils from '../utils/utils.js'
import * as currentUser from '../utils/user_session.js'
import * as api from '../utils/api-call.js'

class Election extends Component {
    constructor() {
        super()
        this.state = {
            candidates : [],
            dataFile : null,
            loading : false
        }
        this.uploadFile = this.uploadFile.bind(this)
      }
    uploadFile(event){
      event.preventDefault()
      this.setState({dataFile : event.target.files[0]})
    }
    handleCreateElection(event){
      event.preventDefault()
      this.setState({loading : true})
      if (this.state.dataFile !== null) {
        let data = new FormData()
        data.append('file', this.state.dataFile)
        data.append('email', currentUser.getEmail(cookie))
        data.append('candidates', this.state.candidates.map((candidate) => {
          return candidate.name
        }))
        api.initElectionByCSV(data).then((res) => {
          currentUser.setElectionCreated(cookie, true)
          currentUser.setCategory(cookie, "0")
          this.setState({loading : false})
          utils.showSuccess(this.msg, "Eleccion creada y Autoridad Electoral seteada para esta eleccion")
        }).catch(error => {
          utils.showError(this.msg, error.response.data)
          this.setState({loading : false})
        })
      } else {
        utils.showError(this.msg, "Debes agregar informacion de los distritos/escuelas/mesas")
        this.setState({loading : false})
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
            <Header as='h2' textAlign='center'>Crear Eleccion con los siguientes candidatos</Header>
            {this.state.loading ? <Loader active inline='centered'/> : null}
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
