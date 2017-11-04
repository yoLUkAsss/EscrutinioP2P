import React, { Component } from 'react'

import { Container, Header, List} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

class Home extends Component {
  handleInfoEleccion(event){
    console.log(event)
  }
  renderContentsTable(){
    return (
      <Container text>
        <Header as='h3'>Tabla de Contenidos</Header>
        <List ordered link>
          <List.Item as='a' onClick={this.handleInfoEleccion.bind(this)}>Informacion de la eleccion</List.Item>
          <List.Item as='a'>Informacion de los distritos</List.Item>
          <List.Item as='a'>Informacion de las escuelas</List.Item>
          <List.Item as='a'>Informacion de las mesas</List.Item>
          <List.Item as='a'>Informacion de los candidatos</List.Item>
        </List>
      </Container>
    )
  }
  renderBody(){
    return (
      <Container text>
        <List ordered>
          <List.Item>
            <List.Header as='a'>Informacion de la eleccion</List.Header>
            <List.Description>
              La eleccion se encuentra creada
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header as='a'>Informacion de los distritos</List.Header>
            <List.Description>
              Actualmente participan N distritos
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header as='a'>Informacion de las escuelas</List.Header>
            <List.Description>
              Actualmente participan M escuelas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header as='a'>Informacion de las mesas</List.Header>
            <List.Description>
              Actualmente participan L mesas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header as='a'>Informacion de los candidatos</List.Header>
            <List.Description>
              Actualmente participan los siguientes candidatos:
            </List.Description>
            <List.List>
              <List.Item>Candidato azul</List.Item>
              <List.Item>Candidato rojo</List.Item>
            </List.List>
          </List.Item>
        </List>
      </Container>
    )
  }
  render() {
      return (
          <Container text>
              <Header as='h2'>Bienvenidos a Escrutinio Peer to Peer</Header>
              {this.renderContentsTable()}
              {this.renderBody()}
          </Container>
      );
  }
}

export default Home
