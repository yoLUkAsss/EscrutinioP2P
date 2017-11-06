import React, { Component } from 'react';
import {Header, List, Button, Form, Input, Icon} from 'semantic-ui-react'
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
    // this.handleChangeItem = this.handleChangeItem.bind(this)
    // this.handleAddItem = this.handleAddItem.bind(this)
    // this.handleDeleteItem = this.handleDeleteItem.bind(this)
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

        <Form>
          {this.state.items.map((item, idItem) => (
            <Form.Field inline key={idItem}>
              <label>Candidato: </label>
              <Input focus
                  type={this.state.type}
                  placeholder={this.state.placeholder}
                  value={item.name}
                  onChange={this.handleChangeItem(idItem)}
                />
              <Button animated basic onClick={this.handleDeleteItem(idItem)}>
                <Button.Content visible>
                  <Icon name='delete'/>
                </Button.Content>
                <Button.Content hidden>
                  <label color="orange">Borrar </label>
                </Button.Content>
              </Button>
            </Form.Field>
          ))}

          <Button basic primary floated="right" onClick={this.handleAddItem}>
            {this.state.add}
          </Button>
        </Form>
      </div>
    );
  }
}

export default RDLF
