import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

//props : itemsHeader, son los que aparecen en el header de la tabla
//props : itemsBody, son los que aparecen en cada row
class CustomTable extends Component{
  render(){
    return (
      <Table celled size='small'>
        <Table.Header>
          <Table.Row>
            {
              this.props.itemsHeader.map((ih, id) => {
                return (<Table.HeaderCell key={id}>{ih}</Table.HeaderCell>)
              })
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.props.itemsBody.map((item, idItem) => {
              return (
                <Table.Row key={idItem}>
                  {
                    Object.values(item).map((value, idValue) => {
                      return (
                        <Table.Cell key={idValue}>{value}</Table.Cell>
                      )
                    })
                  }
                </Table.Row>
              )
            })
          }
          <Table.Row>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default CustomTable
