import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css'
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

import './css/table.css'

import Center from 'react-center'

class Tabla extends Component {

    constructor() {
        super();
        this.state = {
            name: 'Not election yet',
            message : '',
            headers : [{id : 'id', name :"Titulo"}, {id : 'name', name :"Lista 1"}, {id : 'price', name :"Lista 2"}],
            products : [
                {
                    id: "Apoderado",
                    name: 12,
                    price: 45
                },
                {
                    id: "Fiscal 1",
                    name: 12,
                    price: 46
                },
                {
                    id: "Fiscal 2",
                    name: 12,
                    price: 45
                }
            ]
        }

    }
    render() {
        return (
            <Center>
            <div>
                <h3> Welcome to DEscrutinio </h3>
                <h1> Información de Mesa </h1>

                <BootstrapTable
                    data={this.state.products}
                    striped
                    hover
                    pagination
                    tableContainerClass='tableSize'
                    height={410}>
                    {
                        this.state.headers.map(
                            (value, index) => {
                                if (index === 0) {
                                    return <TableHeaderColumn isKey dataField={value.id}>{value.name}</TableHeaderColumn>
                                } else {
                                    return <TableHeaderColumn dataField={value.id}>{value.name}</TableHeaderColumn>
                                }
                            }
                        )
                    }
                </BootstrapTable>
            </div>
            </Center>
        )
    }
}

  export default Tabla
