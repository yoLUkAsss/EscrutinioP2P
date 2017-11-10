import React, { Component } from 'react'
import {Container} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'
import PieChartComponent from '../utils/PieChartComponent.js'

class TotalMesas extends Component {
    render() {
        return (
          <Container>
            <ComponentTitle title="Resultados parciales de todas las mesas"/>
            <PieChartComponent/>
          </Container>
        )
    }
}
export default TotalMesas
