import React, { Component } from 'react'

import { Container, Button} from 'semantic-ui-react'


import cookie from 'react-cookies'
// import ComponentTitle from '../utils/ComponentTitle.js'
import * as utils from '../utils/user_session.js'

class NoTask extends Component {

    constructor () {
        super()
        this.seeinfo = this.seeinfo.bind(this)
        this.cleaninfo = this.cleaninfo.bind(this)
      }

    seeinfo(event) {
        event.preventDefault()
    }

    cleaninfo(event) {
        event.preventDefault()
        utils.clean(cookie)
    }

    render() {

        return (
            <Container text>
              <Button onClick={this.seeinfo}>
                  See info
              </Button>
              <Button onClick={ this.cleaninfo}>
                  Clean Cookies
              </Button>
            </Container>
        );
    }
}

export default NoTask
