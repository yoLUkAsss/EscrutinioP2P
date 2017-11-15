// react utilities
import React, { Component } from 'react';
import { Button, Header, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'

import * as utils from '../utils/utils.js'
import * as api from '../utils/api-call.js'
import CustomTable from '../utils/CustomTable.js'
import LoadingComponent from '../utils/LoadingComponent.js'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class Mesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          candidatos : [],
          isMesaInvalid : false,
          loading : true
        }
    }

    // this.setState({candidates : res.data.map(x => {return x.name}), counts : res.data.map(x => {return x.counts}), background : utils.getBackground(results.data.candidates.length), border : utils.getBorder(results.data.candidates.length), loading : false})
    // <PieChartComponent candidates={this.state.candidates} counts={this.state.counts} background={this.state.background} border={this.state.border} title={"Resultados Parciales de todas las Mesas"} label={"# de votos"}/>


    componentWillMount() {
      api.getMesaTotal(this.props.match.params.distritoId,
        this.props.match.params.escuelaId,
        this.props.match.params.mesaId).then((res) => {
        this.setState({candidatos : res.data, loading : false})
      }).catch(error => {
        this.setState({isMesaInvalid : true, loading : false})
      })
    }
    //cambiarlo, setearle los props de los parametros en el componentWillMount como parte de la mesa
    getMesaId = () => {
    return `${this.props.match.params.distritoId}${this.props.match.params.escuelaId}${this.props.match.params.mesaId}`
    }

    renderMesa(){
        return (
          <Container text>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Header as='h4'>Datos de la Mesa: {this.getMesaId()}</Header>
            <Header as='h3'>Candidatos</Header>
            <CustomTable itemsHeader={["Candidato","Conteo"]} itemsBody={this.state.candidatos}/>
          </Container>
        )
    }

    renderInvalidMesa(){
      return (
        <Container text>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> {this.getMesaId()} no corresponde a una mesa válida</Header>
          <Button onClick={event => {
            this.props.history.push("/mesas")
          }}> Volver a las mesas
          </Button>
        </Container>
      )
    }

    render () {
      if(this.state.loading){
        return (<LoadingComponent actve={this.state.loading}/>)
      } else if(this.state.isMesaInvalid){
          return this.renderInvalidMesa();
        } else{
          return this.renderMesa();
        }
    }
}

export default withRouter(Mesa)
