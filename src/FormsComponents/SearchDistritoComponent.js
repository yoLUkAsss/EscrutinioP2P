/**
 * React utilities
 */
import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

class SearchDistritoComponent extends Component {
    constructor() {
        super()
        this.state = {
          distritoSeleccionado : ""
        }
    }

    render () {
        return (
            <Dropdown 
                inline 
                selection
                options={this.props.distritos} 
                value={this.state.distritoSeleccionado}
                defaultValue={this.props.distritos[0]}
                noResultsMessage="No existen distritos" />
        );
    }
}

export default SearchDistritoComponent
