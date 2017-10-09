import React, { Component } from 'react'

import { Container, Button} from 'semantic-ui-react'


import cookie from 'react-cookies'
import ComponentTitle from '../utils/ComponentTitle.js'

class Home extends Component {

    constructor () {
        super()

        this.seeinfo = this.seeinfo.bind(this)
      }

    seeinfo(event) {
        event.preventDefault()
        let info = {
            "email" : cookie.load('current_user_email'),
            "address" : cookie.load('current_user_address'),
            "category" : cookie.load('current_user_category')
        }

        console.log(JSON.stringify(info, undefined, 2))
    }

    render() {

        return (
            <Container>
            <div>

                <ComponentTitle title="Bienvenidos a Ep2p"/>

                <Button onClick={this.seeinfo}>
                    See info
                </Button>
            </div>
            </Container>
        );
    }
}

export default Home
