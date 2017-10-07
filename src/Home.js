import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import Center from 'react-center'
import { Container, Form, Header, Button} from 'semantic-ui-react'

import ComponentTitle from './utils/ComponentTitle.js'

import cookie from 'react-cookies'

class Home extends Component {
    
    constructor () {
        super()
    
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.seeinfo = this.seeinfo.bind(this)
      }

    login(event) {
        event.preventDefault()
        cookie.save('username', "sandoval.lucasj@gmail.com", { path: '/' });
        cookie.save('address', "0x01010101010101010101", { path: '/' });
    }

    logout(event) {
        event.preventDefault()
        cookie.save('username', "", { path: '/' });
        cookie.save('address', "", { path: '/' });
    }

    seeinfo(event) {
        event.preventDefault()
        let info = {
            "user" : cookie.load('username'),
            "adds" : cookie.load('address')
        }
    
        console.log(JSON.stringify(info, undefined, 2))
    }

    // login = (event) => {
    //     event.preventDefault()
    //     console.log(JSON.stringify(CustomSession.email, undefined, 2))
    //     CustomSession.set_current_user("asd", "dsa", "sdasdas")
    // }

    // logout = (event) => {
    //     event.preventDefault()
    // }

    // seeinfo = (event) => {
    //     event.preventDefault()
    //     let info = CustomSession.get_current_user()
    //     console.log(JSON.stringify(info, undefined, 2))
    // }
    
    render() {

        return (
            <Container>
            <div>
                <Button onClick={this.login}>
                    Log in
                </Button>
                <Button onClick={this.logout}>
                    Log out
                </Button>
                <Button onClick={this.seeinfo}>
                    See info
                </Button>

            </div>
            </Container>
        );
    }
}

  export default Home
