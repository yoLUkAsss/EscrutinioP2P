import React, { Component } from 'react'
import Scrollchor from 'react-scrollchor'
import { Container, Header, Divider, List, Segment} from 'semantic-ui-react'

class Home extends Component {
  handleInfoEleccion(event){
    // api.getElectionInfo().then(res => {
    //
    // }).catch(error => {
    //
    // })
  }
  renderContentsTable(){
    return (
      <Container text>
        <Header as='h3'>Tabla de Contenidos</Header>
        <Segment compact>
          <List ordered link>
            <List.Item as={Scrollchor} to="#eleccion">Informacion de la eleccion</List.Item>
            <List.Item as={Scrollchor} to="#distritos">Informacion de los distritos</List.Item>
            <List.Item as={Scrollchor} to="#escuelas">Informacion de las escuelas</List.Item>
            <List.Item as={Scrollchor} to="#mesas">Informacion de las mesas</List.Item>
            <List.Item as={Scrollchor} to="#candidatos">Informacion de los candidatos</List.Item>
          </List>
        </Segment>
      </Container>
    )
  }
  renderBody(){
    return (
      <Container text>
        <List ordered>
          <List.Item>
            <List.Header id="eleccion">Informacion de la eleccion</List.Header>
            <List.Description>
              La eleccion se encuentra creada
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="distritos">Informacion de los distritos</List.Header>
            <List.Description>
              Actualmente participan N distritos
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="escuelas">Informacion de las escuelas</List.Header>
            <List.Description>
              Actualmente participan M escuelas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="mesas">Informacion de las mesas</List.Header>
            <List.Description>
              Actualmente participan L mesas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="candidatos">Informacion de los candidatos</List.Header>
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
              <Divider/>
              {this.renderBody()}
          </Container>
      );
  }
}

export default Home
