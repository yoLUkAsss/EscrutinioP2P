import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import PieChartComponent from '../utils/PieChartComponent.js'
import LoadingComponent from '../utils/LoadingComponent.js'
import * as api from '../utils/api-call.js'
import * as utils from '../utils/utils.js'

class TotalMesas extends Component {

  constructor(props){
    super(props)
    this.state = {
      candidates : [],
      counts : [],
      background : [],
      border : [],
      loading : true
    }
  }


  componentWillMount(){
    api.getTotal().then(results => {
      console.log(results)
      this.setState({candidates : results.data.candidates, counts : results.data.counts, background : utils.getBackground(results.data.candidates.length), border : utils.getBorder(results.data.candidates.length), loading : false})
    }).catch(error => {
      this.setState({loading : false})
    })
  }

    render() {
      if(this.state.loading){
        return (<LoadingComponent/>)
      }
        return (
          <Container>
            <PieChartComponent candidates={this.state.candidates} counts={this.state.counts} background={this.state.background} border={this.state.border} title={"Resultados Parciales de todas las Mesas"} label={"# de votos"}/>
          </Container>
        )
    }
}
export default TotalMesas
