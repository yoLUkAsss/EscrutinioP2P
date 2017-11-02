// react utilities
import React, { Component } from 'react';
import { Button, Form, Header, Container, Table} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import AlertContainer from 'react-alert'

// Utils
// import contract from 'truffle-contract'
// import getWeb3 from '../utils/getWeb3'
import * as utils from '../utils/utils.js'
import * as api from '../utils/api-call.js'
import CustomTable from '../utils/CustomTable.js'

// Contracts
// import DistritoCRUDContract from '../../build/contracts/DistritoCRUD.json'
// import DistritoContract from '../../build/contracts/Distrito.json'
// import EscuelaContract from '../../build/contracts/Escuela.json'
// import MesaContract from '../../build/contracts/Mesa.json'

//ver si se puede usar RefactoredDLF
/**
Usa los siguientes props
* match viene por ser un "child" component de route
*/

class Mesa extends Component {
    constructor(props) {
        super(props);
        this.state = {
          candidatos : [],
          isMesaInvalid : false,
          loading : true
        }
    }

    componentWillMount() {
      api.getMesaTotal(this.props.match.params.distritoId,
        this.props.match.params.escuelaId,
        this.props.match.params.mesaId).then((res) => {
        this.setState({candidatos : res.data, loading : false})
      }).catch(error => {
        this.setState({isMesaInvalid : true, loading : false})
      })
    }
    getMesaId = () => {
    return `${this.props.match.params.distritoId}${this.props.match.params.escuelaId}${this.props.match.params.mesaId}`
    }

    renderTable(){
      return (
        <Table>
          <Table.Header>
            <Table.Row>
              {
                ["Candidato","Conteo"].map((ih, id) => {
                  return (<Table.HeaderCell key={id}>{ih}</Table.HeaderCell>)
                })
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              this.state.candidatos.map((item, idItem) => {
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


    renderMesa(){
      if(this.state.loading){
        return (<div>Loading</div>);
      } else{
        return (
          <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'>Datos de la Mesa: {this.getMesaId()}</Header>
          <Header as='h3'>Candidatos</Header>
          <CustomTable itemsHeader={["Candidato","Conteo"]} itemsBody={this.state.candidatos}/>
          </Container>
        )
      }
    }

    renderInvalidMesa(){
      return (
        <Container>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h3'> {this.getMesaId()} no corresponde a una mesa válida</Header>
          <Button onClick={event => {
            this.props.history.push("/mesas")
          }}> Volver a las mesas
          </Button>
        </Container>
      )
    }

    render () {
        if(this.state.isMesaInvalid){
          return this.renderInvalidMesa();
        } else{
          return this.renderMesa();
        }
    }
}

export default withRouter(Mesa)
