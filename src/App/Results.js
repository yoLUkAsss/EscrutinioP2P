import React, { Component } from 'react'
import PieChartComponent from '../utils/PieChartComponent.js'
import LoadingComponent from '../utils/LoadingComponent.js'

class Results extends Component {
  render() {
    if(this.props.loading){
      return (<LoadingComponent/>)
    }
    if(this.props.errorMessage !== ""){
      return (
        <div>
          <PieChartComponent title={this.props.errorMessage}/>
        </div>
      )
    } else {
      return (
        <div>
          <PieChartComponent candidates={this.props.candidates} counts={this.props.counts} background={this.props.background} border={this.props.border} title={"Resultados Parciales de todas las Mesas"} label={"# de votos"}/>
        </div>
      )
    }
  }
}
export default Results
