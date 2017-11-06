import React, { Component } from 'react'

import { Container, Header, List, Divider, Segment, Grid} from 'semantic-ui-react'
// import ComponentTitle from '../utils/ComponentTitle.js'

class Footer extends Component {
  renderContent(){
    return (
      <Segment className="footer" inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Contacto' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
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
