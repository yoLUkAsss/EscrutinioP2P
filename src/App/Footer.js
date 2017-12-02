import React, { Component } from 'react'

import { Container, Header, List, Segment, Grid} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

class Footer extends Component {
  renderContent(){
    return (
      <Segment className="footer" inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>


                <Grid.Column width={5}>
                  <Header inverted as='h4' content='Links Útiles' />
                  <List animated link inverted>

                    <List.Item as='a' href="//github.com/yoLUkAsss/DEscrutinio" >
                      <List.Icon name='github' />
                      <List.Content> Repositorio </List.Content>
                    </List.Item>


                    <List.Item as='a' href="//ethereum.org">
                    <List.Icon name='bitcoin' />
                      <List.Content> Sitio Oficial Ethereum </List.Content>
                    </List.Item>


                    <List.Item as='a' href="//unq.edu.ar" >
                      <List.Icon name='university' />
                      <List.Content> Universidad N. de Quilmes </List.Content>
                    </List.Item>

                  </List>
                </Grid.Column>



                <Grid.Column width={9}>
                  <Header inverted as='h4' content='Contacto' />
                  <List link inverted>

                    <List.Item as='a'>
                      <List.Icon name='mail' />
                      <List.Content> Sandoval Lucas: sandoval.lucasj@gmail.com </List.Content>
                    </List.Item>

                    <List.Item as='a'>
                      <List.Icon name='mail' />
                      <List.Content> Laime Jesus: laimejesu@gmail.com </List.Content>
                    </List.Item>
                  </List>

                </Grid.Column>
                {/* <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column> */}
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
    )
  }
  render() {
      return (
        <div>
          {this.renderContent()}
        </div>
      );
  }
}

export default Footer

// atached="bottom"
// <Container text>
// <Segment attached="bootom">
// Hola soy un footer
// </Segment>
// </Container>
