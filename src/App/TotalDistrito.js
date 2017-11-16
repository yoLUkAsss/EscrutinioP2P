// react utilities
import React, { Component } from 'react';
import { Button, Header, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'

import * as utils from '../utils/utils.js'
import * as api from '../utils/api-call.js'
import CustomTable from '../utils/CustomTable.js'
import LoadingComponent from '../utils/LoadingComponent.js'
import PieChartComponent from '../utils/PieChartComponent.js'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class TotalDistrito extends Component {
    constructor(props) {
        super(props);
        this.state = {
          candidates : [],
          counts : [],
          background : [],
          border : [],
          isMesaInvalid : false,
          loading : true
        }
    }

    componentWillMount(){
      api.getTotalDistrito(this.props.match.params.distritoId)
      .then(results => {
        this.setState({candidates : results.data.candidates, counts : results.data.counts, background : utils.getBackground(results.data.candidates.length), border : utils.getBorder(results.data.candidates.length), loading : false})
        utils.showSuccess(this.msg, "TODO OK")
      })
      .catch(error => {
        utils.showError(this.msg, error.response.data)
        this.setState({loading : false, errorMessage : error.response.data})
      })
    }

    //cambiarlo, setearle los props de los parametros en el componentWillMount como parte de la mesa
    getDistritoId = () => {
      return `${this.props.match.params.distritoId}`
    }

    renderValid(){
        return (
          <Container text>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <PieChartComponent
              candidates={this.state.candidates}
              counts={this.state.counts}
              background={this.state.background}
              border={this.state.border}
              title={"Resultados Parciales del distrito: " + this.props.match.params.distritoId}
              label={"# de votos"}/>
          </Container>
        )
    }

    renderInvalid(){
      return (
        <Container text>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> {this.getDistritoId()} no corresponde a un distrito válido</Header>
          <Button onClick={event => {
            this.props.history.push("/")
          }}> Inicio
          </Button>
        </Container>
      )
    }

    render () {
      if(this.state.loading){
        return (<LoadingComponent actve={this.state.loading}/>)
      } else if(this.state.isMesaInvalid){
          return this.renderInvalid();
        } else{
          return this.renderValid();
        }
    }
}

export default withRouter(TotalDistrito)
