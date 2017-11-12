import React, { Component } from 'react'
import { Grid, Container, Divider, Button, Form, Dimmer, Loader, Header } from 'semantic-ui-react'
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
            candidates : []
        }
    }
    handleCreateElection(event){
      event.preventDefault()
      api.initElection(currentUser.getEmail(cookie), this.state.candidates.map(x => {return x.name})).then((res) => {
        currentUser.setElectionCreated(cookie, true)
        currentUser.setCategory(cookie, "0")
        utils.showSuccess(this.msg, "Eleccion creada, eres la Autoridad Electoral para esta eleccion", () => {this.props.history.push("/")})
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, error.response.data)
      })
    }
    handleNewCandidates = (newCandidates) => {
      this.setState({candidates : newCandidates})
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
          </div>
        );
    }
}

export default withRouter(Election)
