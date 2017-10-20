import React, { Component } from 'react'
import AlertContainer from 'react-alert'
import {Container} from 'semantic-ui-react'
import ComponentTitle from '../utils/ComponentTitle.js'
import * as utils from '../utils/utils.js'
import getWeb3 from '../utils/getWeb3'

class Distritos extends Component {
    componentWillMount() {
      getWeb3.then(results => {
        this.setState({web3 : results.web3})
      }).catch(() => {
          console.log('Error finding web3.')
      })
    }

    render() {
        return (
          <div>
          <Container>
            <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <ComponentTitle title="Resultados parciales de estos distritos"/>
          </Container>
          </div>
        )
    }
}
export default Distritos
