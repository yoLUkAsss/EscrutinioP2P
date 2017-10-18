import React, { Component } from 'react';
import {Header, List, Button, Form, Input} from 'semantic-ui-react'
// RefactoredDLF
class RDLF extends Component {

  constructor(props){
    super(props)
    this.state = {
      items : props.candidates || [],
      type : props.type || "text",
      placeholder : props.placeholder || "placeholder",
      title : props.title || "title",
      add : props.add || "add",
      del : props.del || "delete"
    }
  }

  handleChangeItem = (idItem) => (evt) => {
    const newItems = this.state.items.map((item, idIterator) => {
      if (idItem !== idIterator) return item
      return { ...item, name: evt.target.value }
    })
    this.setState({ items: newItems})
    this.props.onChange(newItems)
  }

  handleAddItem = () => {
    this.setState({ items: this.state.items.concat([{ name: '' }]) })
  }

  handleDeleteItem = (idItem) => () => {
    const newItems = this.state.items.filter((item, idIterator) => idItem !== idIterator)
    this.setState({ items:  newItems})
    this.props.onChange(newItems)
  }

  render(){

    return (
      <div>
        <Header as='h3'>{this.state.title}</Header>
        <List>
        {this.state.items.map((item, idItem) => (
          <List.Item key={idItem}>
            <Form.Field inline>
              <Input focus
                type={this.state.type}
                placeholder={this.state.placeholder}
                value={item.name}
                onChange={this.handleChangeItem(idItem)}
              />
              <Button onClick={this.handleDeleteItem(idItem)}>
                {this.state.del}
              </Button>
            </Form.Field>
          </List.Item>
        ))}
        </List>
        <Button onClick={this.handleAddItem}>
          {this.state.add}
        </Button>
      </div>
    );
  }
}

export default RDLF

//con iconos
// <Button fluid icon onClick={this.handleDeleteItem(idItem)}>
//   <Icon name='remove'/>
// </Button>
// <Button fluid icon onClick={this.handleAddItem}>
//   <Icon name='plus'/>
// </Button>
