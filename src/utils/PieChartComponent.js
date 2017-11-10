import React, {Component} from "react"

import {Container, Segment} from 'semantic-ui-react'
import {Pie} from 'react-chartjs-2'


class PieChartComponent extends Component{
    constructor() {
        super()

        this.state = {

            partidos : ["lista 1", "lista 2"],  //PARAMETRICO
            conteos : [23, 13],                 //PARAMETRICO
            
            
            data: {
                labels: ["lista 1", "lista 2"],
                datasets: [{
                    label: '# of Votes',        //PARAMETRICO
                    data: [23, 13],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                "display": true,
                "position": "left",
                "fullWidth": true,
                "reverse": false,
                "labels": {
                  "fontColor": "rgb(255, 99, 132)"
                },
                title: {
                    display: true,
                    text: 'Custom Chart Title'  //PARAMETRICO
                }
            }
        }
    }

    render() {

        return (
            <div>
                <Pie data={this.state.data} options={this.state.options}/>
            </div>
        )
    }
}

export default PieChartComponent