// react utilities
import React, { Component } from 'react';
import { Form, Header, Container, Divider, Grid} from 'semantic-ui-react'
import {withRouter, Switch, Route} from 'react-router-dom'
import AlertContainer from 'react-alert'

// componentes
import TotalMesas from '../App/TotalMesas.js'
import TotalDistrito from '../App/TotalDistrito.js'
import TotalEscuela from '../App/TotalEscuela.js'
import Mesa from '../App/Mesa.js'

// Utils
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'

// Contracts

class SearchMesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : ""
        }
    }

    handleSearchTotalMesa = (event) => {
      if (this.state.distritoId && this.state.escuelaId && this.state.mesaId) {
        this.props.history.push(this.props.match.url + "/" + this.state.distritoId + "/" + this.state.escuelaId + "/" + this.state.mesaId)
      } else {
        utils.showError(this.msg, "Ingrese id de distrito, id de escuela e id de mesa")
      }
    }

    handleSearchTotalEscuela = (event) => {
      if (this.state.distritoId && this.state.escuelaId) {
        this.props.history.push(this.props.match.url + "/" + this.state.distritoId + "/" + this.state.escuelaId)
      } else {
        utils.showError(this.msg, "Ingrese id de distrito y id de escuela")
      }
    } 

    handleSearchTotalDistrito = (event) => {
      if (this.state.distritoId) {
        this.props.history.push(this.props.match.url + "/" + this.state.distritoId)
      } else {
        utils.showError(this.msg, "Ingrese id de distrito")
      }
    } 

    handleMesa = (evt) => {this.setState({ mesaId : evt.target.value })}

    handleEscuela = (evt) => {this.setState({ escuelaId : evt.target.value })}

    handleDistrito = (evt) => {this.setState({ distritoId : evt.target.value })}

    render () {
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Form >
              
              <Grid columns={3} divided>
                
                <Grid.Row>
                  
                  <Grid.Column>
                    <Form.Input
                      type="number"
                      label='ID del Distrito'
                      placeholder="ID del Distrito"
                      value={this.state.distritoId}
                      onChange={this.handleDistrito.bind(this)}/>
                  </Grid.Column>
                  
                  <Grid.Column>
                    <Form.Button basic color="green" content='Buscar' onClick={this.handleSearchTotalDistrito.bind(this)}/>
                  </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                  
                  <Grid.Column>
                    <Form.Input
                      type="number"
                      label='ID de la Escuela'
                      placeholder="ID de la Escuela"
                      value={this.state.escuelaId}
                      onChange={this.handleEscuela.bind(this)}/>
                  </Grid.Column>
                  
                  <Grid.Column>
                    <Form.Button basic color="green" content='Buscar' onClick={this.handleSearchTotalEscuela.bind(this)}/>
                  </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                  
                  <Grid.Column>
                    <Form.Input
                      type="number"
                      label='ID de la Mesa'
                      placeholder="ID de la Mesa"
                      value={this.state.mesaId}
                      onChange={this.handleMesa.bind(this)}/>
                  </Grid.Column>
                  
                  <Grid.Column>
                    <Form.Button basic color="green" content='Buscar' onClick={this.handleSearchTotalMesa.bind(this)}/>
                  </Grid.Column>

                </Grid.Row>

             </Grid>


          </Form>
          <Divider/>
          <Switch>
            <Route exact path={`${this.props.match.url}`} component={TotalMesas}/>
            <Route exact path={`${this.props.match.url}/:distritoId/:escuelaId/:mesaId`} component={Mesa}/>
            <Route exact path={`${this.props.match.url}/:distritoId/:escuelaId`} component={TotalEscuela}/>
            <Route exact path={`${this.props.match.url}/:distritoId`} component={TotalDistrito}/>
          </Switch>
        </Container>
      );
    }
}

export default withRouter(SearchMesa)
