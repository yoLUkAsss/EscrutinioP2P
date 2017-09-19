import React, { Component } from 'react';
import {Header, List, Button, Icon, Form, Input} from 'semantic-ui-react'

class DinamicListForm extends Component {

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
      <div>
        <Header as='h3'>{this.props.title}</Header>
        <List>
        {this.props.items.map((item, idItem) => (
          <List.Item>
            <Form.Field inline>
              <Input focus type={this.props.type}
              placeholder={this.props.placeholder}
              value={item.name}
              onChange={this.props.onUpdate(idItem)}/>
              <Button icon onClick={this.props.onDelete(idItem)}>
                <Icon name='remove'/>
              </Button>
            </Form.Field>
          </List.Item>
        ))}
        </List>
        <Button icon onClick={this.props.onAdd}>
          <Icon name='plus'/>
        </Button>
      </div>
    );
  }
}

export default DinamicListForm
