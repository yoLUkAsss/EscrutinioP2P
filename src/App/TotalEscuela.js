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

class TotalEscuela extends Component {
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

    // this.setState({candidates : res.data.map(x => {return x.name}), counts : res.data.map(x => {return x.counts}), background : utils.getBackground(results.data.candidates.length), border : utils.getBorder(results.data.candidates.length), loading : false})
    // <PieChartComponent candidates={this.state.candidates} counts={this.state.counts} background={this.state.background} border={this.state.border} title={"Resultados Parciales de todas las Mesas"} label={"# de votos"}/>


    componentWillMount(){
      api.getTotalEscuela(this.props.match.params.distritoId, this.props.match.params.escuelaId)
      .then(results => {
        console.log(JSON.stringify(results, undefined, 2))
        this.setState({candidates : results.data.candidates, counts : results.data.counts, background : utils.getBackground(results.data.candidates.length), border : utils.getBorder(results.data.candidates.length), loading : false})
      })
      .catch(error => {
        utils.showError(this.msg, error.response.data)
        this.setState({loading : false, errorMessage : error.response.data})
      })
    }

    //cambiarlo, setearle los props de los parametros en el componentWillMount como parte de la mesa
    getEscuelaId = () => {
      return `${this.props.match.params.distritoId} ${this.props.match.params.escuelaId}`
    }
    // <Container text>
    //   <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
    //   </Container>
    renderValid(){
        return (
            <PieChartComponent
              candidates={this.state.candidates}
              counts={this.state.counts}
              background={this.state.background}
              border={this.state.border}
              title={"Resultados Parciales del distrito: " + this.props.match.params.distritoId + " - escuela: " + this.props.match.params.escuelaId}
              label={"# de votos"}/>
        )
    }
    // <Container text>
    //   <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
    // </Container>
    renderInvalid(){
      return (
        <div>
          <Header as='h3'> {this.getEscuelaId()} no corresponde a una escuela válida</Header>
          <Button onClick={event => {
            this.props.history.push("/")
          }}> Inicio
          </Button>
        </div>
      )
    }

    render () {
      let toRender = null
      if(this.state.loading){
        toRender = (<LoadingComponent/>)
      } else if(this.state.isMesaInvalid){
          toRender = this.renderInvalid();
        } else{
          toRender = this.renderValid();
        }
      return (
        <div>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          {toRender}
        </div>
      )
    }
}

export default withRouter(TotalEscuela)
