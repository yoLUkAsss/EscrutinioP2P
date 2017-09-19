import React, { Component } from 'react';

import {Header} from 'semantic-ui-react'

class ComponentTitle extends Component {

    render () {

        return (
            <div>
                <h2> Will be covered </h2>
                <Header as='h2'>{this.props.title}</Header> 
            </div>
        );
    }
}

export default ComponentTitle
