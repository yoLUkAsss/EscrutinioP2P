/**
 * React utilities
 */
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Center from 'react-center'

/**
 * Components
 */
import ComponentTitle from '../utils/ComponentTitle.js'

/**
 * Controller for Component
 */
import AuthHomeController from './AuthHomeController.js'


class AuthHome extends Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : ""
        };
    }

    render () {
        return (
            <Center>
            <div>
                <ComponentTitle title='Autenticación'/>
                
                <Form onSubmit={ (event) => { AuthHomeController.showData(event, this.state) }  }>
                    <Form.Input 
                        required
                        inline
                        label='Email' 
                        placeholder='Email' 
                        value={this.state.email}
                        onChange={ (event) => { this.setState({ email : event.target.value }) } }/>

                    <Form.Input
                        required
                        inline
                        label='Contraseña'
                        placeholder='Contraseña' 
                        value={this.state.password}
                        onChange={ (event) => { this.setState({ password : event.target.value }) } }/>

                    <Button>Autenticar</Button>
                </Form>

            </div>
            </Center>
        );
    }
}

export default AuthHome
