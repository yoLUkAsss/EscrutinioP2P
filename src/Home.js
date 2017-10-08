import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import { Container, Button} from 'semantic-ui-react'


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
    logoutCurrent = (event) => {
      event.preventDefault()
      console.log("before delete")
      console.log(cookie.load("current_user_address"))
      cookie.save("current_user_address", "", {path:"/"})
      cookie.save("email", "", {path:"/"})
    }

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
                <Button onClick={this.seeinfo}>
                    See info
                </Button>
                <Button onClick={this.logoutCurrent}>Remove current user</Button>
            </div>
            </Container>
        );
    }
}

  export default Home
