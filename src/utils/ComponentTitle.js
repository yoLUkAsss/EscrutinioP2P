import React, { Component } from 'react';

import {Container, Header} from 'semantic-ui-react'

class ComponentTitle extends Component {

    render () {

        return (
            <Container>
                <Header as='h1'>{this.props.title}</Header> 
            </Container>
        );
    }
}

export default ComponentTitle
