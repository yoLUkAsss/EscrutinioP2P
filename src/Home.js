import React, { Component } from 'react'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import Center from 'react-center'

import ComponentTitle from './utils/ComponentTitle.js'

class Home extends Component {

    render() {
        return (
            <Center>
            <div>
                <ComponentTitle title='Bienvenido a DEscrutinio'/>
            </div>
            </Center>
        )
    }
}

  export default Home
