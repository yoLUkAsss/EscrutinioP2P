import React, { Component } from 'react'

import { Container, Header, List, Divider, Segment, Card, Icon, Image} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

import image from '../images/ethereum-logo.png'

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

        <Segment>

        <Card.Group itemsPerRow={2}>
          <Card color="teal">
            <Image src={image} />
            <Card.Content>
              <Card.Header>
                Sandoval Lucas
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  Ingreso a la UNQ en 2014
                </span>
              </Card.Meta>
              <Card.Description>
                Software developer, gamer, millenial.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='linkedin' />
                Linkedin Page
              </a>
            </Card.Content>
          </Card>

          <Card color="teal">
            <Image src={image} />
            <Card.Content>
              <Card.Header>
                Laime Jesus
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  Ingreso a la UNQ en 2014
                </span>
              </Card.Meta>
              <Card.Description>
                Software developer, gamer, millenial.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <List>
                <List.Item>
                <a><Icon name='linkedin' />Linkedin Page</a>
                </List.Item>
                <List.Item>
                <a><Icon name='facebook' />Facebook Profile</a>
                </List.Item>
                <List.Item>
                <a><Icon name='twitter' />Twitter Account</a>
                </List.Item>
                <List.Item>
                <a><Icon name='call' />+54 9 11 31208500</a>
                </List.Item>
              </List>
            </Card.Content>
          </Card>
        </Card.Group>

        </Segment>


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
