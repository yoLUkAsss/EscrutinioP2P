import React, { Component } from 'react';
import {Container, List, Button, Icon, Form, Input} from 'semantic-ui-react'

class DinamicListForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      items : [{name : ''}],
      type : props.type,
      placeholder : props.placeholder
    }
  }

  handleChangeNameItem = (idItem) => (evt) => {
    const newItems = this.state.items.map((item, idIterator) => {
      if (idItem !== idIterator) return item
      return { ...item, name: evt.target.value }
    })
    this.setState({ items: newItems})
  }

  handleAddItem = () => {
    this.setState({ items: this.state.items.concat([{ name: '' }]) })
  }

  handleRemoveItem = (idItem) => () => {
    this.setState({ items: this.state.items.filter((item, idIterator) => idItem !== idIterator) })
  }

  render(){
    return (
      <Container>
      <List>
      {this.state.items.map((item, idItem) => (
        <List.Item>
          <Form.Field inline>
            <Input focus type={this.state.type}
            placeholder={this.state.placeholder}
            value={item.name}
            onChange={this.handleChangeNameItem(idItem)}/>
            <Button icon onClick={this.handleRemoveItem(idItem)}>
              <Icon name='remove'/>
            </Button>
          </Form.Field>
        </List.Item>
      ))}
      </List>
      <Button icon onClick={this.handleAddItem}>
        <Icon name='plus'/>
      </Button>
      </Container>
    );
  }
}

export default DinamicListForm
