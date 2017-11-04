import React, { Component } from 'react'

import { Container, Header, Divider, List} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

class Guide extends Component {
  handleInfoEleccion(event){
    console.log(event)
  }
  renderContentsTable(){
    return (
      <Container text>
        <Header as='h3'>Tabla de Contenidos</Header>
        <List ordered link>
          <List.Item as='a' onClick={this.handleInfoEleccion.bind(this)}>Guia de la autoridad electoral</List.Item>
          <List.Item as='a'>Guia del apoderado de partido</List.Item>
          <List.Item as='a'>Guia del delegado de distrito</List.Item>
          <List.Item as='a'>Guia del delegado de escuela</List.Item>
          <List.Item as='a'>Guia del presidente de mesa</List.Item>
          <List.Item as='a'>Guia del vicepresidente de mesa</List.Item>
          <List.Item as='a'>Guia del fiscal de mesa</List.Item>
        </List>
      </Container>
    )
  }
  renderBody(){
    return (
      <Container text>
        <List ordered>
        <List.Item>
          <List.Header as='a'>Guia de la autoridad electoral</List.Header>
          <List.Description>
            Es la persona encargada de generar la eleccion con los candidatos que participaran de la eleccion.
            Ademas de generar los distritos participantes de la eleccion, junto con la cantidad de escuelas y mesas disponibles. Por ultimo, tambien debe asignar los siguientes roles a los usuarios del sistema: apoderado de partido y delegado de distrito.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del apoderado de partido</List.Header>
          <List.Description>
            Es la persona encargada de asignar fiscales de su partido en una mesa.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del delegado de distrito</List.Header>
          <List.Description>
            Es la persona encargada de asignar delegados en escuelas en su distrito.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del delegado de escuela</List.Header>
          <List.Description>
            Es la persona encargada de asignar presidentes y vicepresidentes en mesas de su escuela.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del presidente de mesa</List.Header>
          <List.Description>
            Es la persona encargada de informar los votos de los respectivos candidatos de la mesa que esta asignado.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del vicepresidente de mesa</List.Header>
          <List.Description>
            Es la persona encargada de informar los votos de los respectivos candidatos de la mesa que esta asignado.
          </List.Description>
        </List.Item>
        <List.Item>
          <List.Header as='a'>Guia del fiscal de mesa</List.Header>
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
          <Container text>
            <Header as='h2'>Guia de usuarios</Header>
              {this.renderContentsTable()}
              <Divider/>
              {this.renderBody()}
          </Container>
      );
  }
}

export default Guide
