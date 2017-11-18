import React, { Component } from 'react'
import Scrollchor from 'react-scrollchor'
import { Container, Header, Divider, List, Segment} from 'semantic-ui-react'
import * as api from '../utils/api-call.js'
import * as currentUser from '../utils/user_session.js'
import cookie from 'react-cookies'
class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      created : false,
      distritos : "",
      escuelas : "",
      mesas : "",
      candidates : []
    }
    this.electionActive = currentUser.getElectionCreated(cookie)
  }

  componentWillMount(){
    api.getElectionInfo().then(res => {
      currentUser.setElectionCreated(cookie, res.data.created)
      this.setState({created : res.data.created, distritos : res.data.distritos, escuelas : res.data.escuelas, mesas : res.data.mesas, candidates : res.data.candidates})
    }).catch(error => {
      // this.setState({created : false})
    })
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
              Actualmente participan {this.state.distritos} distritos
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="escuelas">Informacion de las escuelas</List.Header>
            <List.Description>
              Actualmente participan {this.state.escuelas} escuelas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="mesas">Informacion de las mesas</List.Header>
            <List.Description>
              Actualmente participan {this.state.mesas} mesas
            </List.Description>
          </List.Item>
          <List.Item>
            <List.Header id="candidatos">Informacion de los candidatos</List.Header>
            <List.Description>
              Actualmente participan los siguientes candidatos:
            </List.Description>
            <List.List>
            {
              this.state.candidates.map(x => {
                return (<List.Item>{x}</List.Item>)
              })
            }
            </List.List>
          </List.Item>
        </List>
      </Container>
    )
  }
  renderElectionInactive(){
    return (
      <div>
        <Header as='h2' textAlign='center'>La eleccion aun no se encuentra activa</Header>
        <p>Por favor vuelva cuando se haya iniciado</p>
      </div>
    )
  }
  //falta buscar los candidatos
  render() {
      return (
          <div>
              <Header as='h2' textAlign='center'>Bienvenidos a Escrutinio Peer to Peer</Header>
              {this.renderContentsTable()}
              <Divider/>
              {this.electionActive ? this.renderBody() : this.renderElectionInactive()}
          </div>
      );
  }
}

export default Home
