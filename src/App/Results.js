import React, { Component } from 'react'
import { Header} from 'semantic-ui-react'
import PieChartComponent from '../utils/PieChartComponent.js'
import LoadingComponent from '../utils/LoadingComponent.js'

class Results extends Component {

  datosCeros(countsList) {
    return countsList.every(value => value === '0' || value === 0)
  }

  render() {
    if(this.props.loading){
      return (<LoadingComponent/>)
    } else {
      if (this.datosCeros(this.props.counts)) {
        return (
          <Header as='h3' textAlign='center'>Aun no se cargaron datos iniciales</Header>
        )
      } else {
        return (
          <div>
            <PieChartComponent candidates={this.props.candidates} counts={this.props.counts} background={this.props.background} border={this.props.border} title={"Resultados Parciales de la busqueda actual"} label={"#conteo"}/>
          </div>
        )
      }
    }
  }
}
export default Results
