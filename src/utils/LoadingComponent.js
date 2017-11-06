import React, {Component} from 'react'
import {Segment, Dimmer, Loader} from 'semantic-ui-react'

//props : itemsHeader, son los que aparecen en el header de la tabla
//props : itemsBody, son los que aparecen en cada row
class LoadingComponent extends Component{
  render(){
    return (
        <div>
            <Segment>
                <Dimmer inverted blurring active>
                    <Loader size='massive' content='Loading' />
                </Dimmer>
            </Segment>
        </div>
    );
  }
}

export default LoadingComponent
