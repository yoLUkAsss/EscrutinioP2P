import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

class CustomTable extends Component{
  render(){
    return (
      <Table>
        <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Candidato</Table.HeaderCell>
            {["c1", "c2"].map((item, id) =>
                (<Table.HeaderCell key={id}>{item}</Table.HeaderCell>)
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Conteo parcial</Table.Cell>
            {["c1","c2"].map((item, id) =>
              (<Table.HeaderCell key={id}>{0}</Table.HeaderCell>)
            )}
          </Table.Row>
          </Table.Body>
      </Table>
    );
  }
}

export default CustomTable
