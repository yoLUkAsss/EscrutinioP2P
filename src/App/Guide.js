import React, { Component } from 'react'
import Scrollchor from 'react-scrollchor'
import { Container, Header, Divider, List, Segment} from 'semantic-ui-react'

class Guide extends Component {
  // handleInfoEleccion(event){
  // }
  renderContentsTable(){
    return (
      <Container text>
        <Header as='h3'>Tabla de Contenidos</Header>
        <Segment compact>
          <List ordered link>
            <List.Item as={Scrollchor} to="#autoridad">Guia de la autoridad electoral</List.Item>
            <List.Item as={Scrollchor} to="#apoderado">Guia del apoderado de partido</List.Item>
            <List.Item as={Scrollchor} to="#delegadodistrito">Guia del delegado de distrito</List.Item>
            <List.Item as={Scrollchor} to="#delegadoescuela">Guia del delegado de escuela</List.Item>
            <List.Item as={Scrollchor} to="#presidentemesa">Guia del presidente de mesa</List.Item>
            <List.Item as={Scrollchor} to="#vicepresidentemesa">Guia del vicepresidente de mesa</List.Item>
            <List.Item as={Scrollchor} to="#fiscalmesa">Guia del fiscal de mesa</List.Item>
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
            <List.Header id="autoridad">Guia de la autoridad electoral</List.Header>
            <List.Description>
              Es la persona encargada de generar la eleccion con los candidatos que participaran de la eleccion.
              Ademas de generar los distritos participantes de la eleccion, junto con la cantidad de escuelas y mesas disponibles. Por ultimo, tambien debe asignar los siguientes roles a los usuarios del sistema: apoderado de partido y delegado de distrito.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="apoderado">Guia del apoderado de partido</List.Header>
            <List.Description>
              Es la persona encargada de asignar fiscales de su partido en una mesa.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="delegadodistrito">Guia del delegado de distrito</List.Header>
            <List.Description>
              Es la persona encargada de asignar delegados en escuelas en su distrito.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="delegadoescuela">Guia del delegado de escuela</List.Header>
            <List.Description>
              Es la persona encargada de asignar presidentes y vicepresidentes en mesas de su escuela.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="presidentemesa">Guia del presidente de mesa</List.Header>
            <List.Description>
              Es la persona encargada de informar los votos de los respectivos candidatos de la mesa que esta asignado.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="vicepresidentemesa">Guia del vicepresidente de mesa</List.Header>
            <List.Description>
              Es la persona encargada de informar los votos de los respectivos candidatos de la mesa que esta asignado.
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="fiscalmesa">Guia del fiscal de mesa</List.Header>
            <List.Description>
              Es la persona encargada de informar los votos de los respectivos candidatos de la mesa que esta asignado.
            </List.Description>
          </List.Item>
        </List>
      </Container>
    )
  }
  render() {
      return (
          <div>
            <Header as='h2' textAlign='center'>Guia de usuarios</Header>
              {this.renderContentsTable()}
              <Divider/>
              {this.renderBody()}
          </div>
      );
  }
}

export default Guide
