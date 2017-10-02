import React, { Component } from 'react';
import {Menu, Container} from 'semantic-ui-react'

class DelegateNavBar extends Component {

  render() {
    return (
    <div>
        <Container>
            <Menu fluid inverted>
                <Menu.Item as='a' href='/delegate/fiscal'>Delegar Fiscal</Menu.Item>
                <Menu.Item as='a' href='/delegate/apoderadoPartido'>Delegar Apoderado de Partido</Menu.Item>
                <Menu.Item as='a' href='/delegate/presidenteMesa'>Delegar Presidente de Mesa</Menu.Item>
                <Menu.Item as='a' href='/delegate/vicepresidenteMesa'>Delegar Vicepresidente de Mesa</Menu.Item>
                <Menu.Item as='a' href='/delegate/delegadoGeneral'>Delegar Delegado General</Menu.Item>
            </Menu>
        </Container>
    </div>
    );
  }
}
export default DelegateNavBar
