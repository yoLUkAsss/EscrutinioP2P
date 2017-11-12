import React, {Component} from "react"

// import {Container, Segment} from 'semantic-ui-react'
import {Pie} from 'react-chartjs-2'


class PieChartComponent extends Component{
    constructor(props) {
        super(props)
        this.info = {
            partidos : this.props.candidates,
            conteos : this.props.counts
          }
        this.data = {
          labels: this.props.candidates,
          datasets: [{
            label: this.props.label,
            data: this.props.counts,
            backgroundColor: this.props.background,
            borderColor: this.props.border,
            borderWidth: 1
          }]
        }
        this.options = {
          "display": true,
          "position": "left",
          "fullWidth": true,
          "reverse": false,
          "labels": {
            "fontColor": "rgb(255, 99, 132)"
          },
          title: {
              display: true,
              text: this.props.title
          }
        }
    }
    render() {
        return (
            <div>
                <Pie data={this.data} options={this.options}/>
            </div>
        )
    }
}

export default PieChartComponent
