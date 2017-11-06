import React, { Component } from 'react'

import { Container, Header, List, Divider} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

class About extends Component {
  renderContent(){
    return (
      <Container text>
        <p>
          EP2P fue desarrollado en el marco del Trabajo de Insercion Profesional de la carrera Tecnicatura en Programacion Informatica, de la Universidad Nacional de Quilmes. Por parte de los estudiantes Lucas Sandoval y Jesus Laime.
        </p>
        <p>
          El impulsor de la idea fue Leonardo Marina, actualmente pertenece(trabajo) en la Universidad de Quilmes.
        </p>
        <p>
          Ante cualquier problema, no dudes en contactarnos.
        </p>
        <Divider/>
        <Header as='h3'>Contacto</Header>
        <List>
          <List.Item>Lucas Sandoval</List.Item>
          <List.Item>Jesus Laime</List.Item>
          <List.Item>Repositorio</List.Item>
          <List.Item>WIKI</List.Item>
        </List>
      </Container>
    )
  }
  render() {
      return (
          <Container text>
            <Header as='h2'>Sobre Escrutinio Peer to Peer</Header>
            {this.renderContent()}
          </Container>
      );
  }
}

export default About
