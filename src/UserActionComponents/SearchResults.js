// react utilities
import React, { Component } from 'react';
import { Form, Divider, Header, Loader, Grid, Segment, Button} from 'semantic-ui-react'
import AlertContainer from 'react-alert'

// componentes
import Results from '../App/Results.js'
import * as utils from '../utils/utils.js'
import * as api from '../utils/api-call.js'
class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          candidates : [],
          loading : false,
          loadingEscuelas : false,
          loadingMesas : false,
          errorMessage : "",
          distritos : [],
          escuelas : [],
          mesas : []
        }
        this.background = []
        this.border = []
    }
    //hacer el handleSearchTotal hace que se vea un toq q no se cargaron datos en toda la eleccion, hacer 1 consulta o hacer otra cosa
    componentWillMount(){
      this.handleSearchTotal()
      api.getDistritos().then(resDistritos => {
        this.setState({
          distritos : resDistritos.data.map((x, idX) => {return { key : idX, value : x, text : x}}),
          escuelas : [],
          mesas : []
        })
      }).catch(error => {
        console.log(error)
      })
    }

    handleSearch(event){
      api.searchResults(this.state.distritoId, this.state.escuelaId, this.state.mesaId).then(results => {
        this.background = utils.getBackground(results.data.candidates.length)
        this.border = utils.getBorder(results.data.candidates.length)
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false,
          errorMessage : ""
        })
      }).catch(error => {
        if(error.response){
          utils.showError(this.msg, error.response.data)
          this.setState({loading : false, errorMessage : error.response.data})
        } else {
          console.log(error)
        }
      })
      this.setState({loading : true})
    }

    handleSearchTotal(event){
      api.getTotal().then(results => {
        this.background = utils.getBackground(results.data.candidates.length)
        this.border = utils.getBorder(results.data.candidates.length)
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false,
          errorMessage : ""
        })
      }).catch(error => {
        if(error.response){
          utils.showError(this.msg, error.response.data)
          this.setState({loading : false, errorMessage : error.response.data})
        } else {
          console.log(error)
        }
      })
      this.setState({loading : true})
    }

    handleDistrito = (event, {value}) => {
      api.getEscuelas(value).then(res => {
        this.setState({
          distritoId : value,
          escuelaId : "",
          mesaId : "",
          mesas : [],
          escuelas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingEscuelas : false
        })
      }).catch(error => {
        this.setState({loadingEscuelas : false})
      })
      this.setState({loadingEscuelas : true, escuelas : [], mesas : []})
    }

    handleEscuela = (event, {value}) => {
      api.getMesas(this.state.distritoId, value).then(res => {
        this.setState({
          escuelaId : value ,
          mesaId : "",
          mesas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingMesas : false,
        })
      }).catch(error => {
        this.setState({loadingMesas : false})
      })
      this.setState({loadingMesas : true, mesas : []})
    }

    handleMesa = (event, {value}) => { this.setState({ mesaId : value }) }
    // {this.state.escuelas.length !== 0 ? this.renderEscuelas() : (this.state.loadingEscuelas ? <Loader active inline='centered'/> : null)}
    renderEscuelas(){
      if(this.state.escuelas.length === 0){
        if(this.state.loadingEscuelas){
          return (<Loader active inline='centered'/>)
        } else {
          return null
        }
      } else {
        return (
          <Form.Dropdown
            required
            label='ID de la Escuela'
            placeholder='Escuela'
            options={this.state.escuelas}
            selection
            value={this.state.escuelaId}
            onChange={this.handleEscuela.bind(this)}
            />
        )
      }
    }
    // {this.state.mesas.length !== 0 ? this.renderMesas() : (this.state.loadingMesas ? <Loader active inline='centered'/> : null)}
    renderMesas(){
      if(this.state.mesas.length === 0){
        if(this.state.loadingMesas){
          return (<Loader active inline='centered'/>)
        } else {
          return null
        }
      } else{
        return (
          <Form.Dropdown
            required
            label='ID de la Mesa'
            placeholder='Mesa'
            options={this.state.mesas}
            selection
            value={this.state.mesaId}
            onChange={this.handleMesa.bind(this)}
          />
        )
      }
    }
    renderForms () {
      return (
        <div>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
          <Header as='h2' textAlign='center'>Consulta de resultados</Header>
            <Form >
              <Form.Dropdown
                required
                label='ID del Distrito'
                placeholder='Distrito'
                options={this.state.distritos}
                selection
                value={this.state.distritoId}
                onChange={this.handleDistrito.bind(this)}
              />
              {this.renderEscuelas()}
              {this.renderMesas()}
              <Form.Group>
                <Form.Button floated="left" basic color="green" width={8} content='Buscar' onClick={this.handleSearch.bind(this)}/>
                <Form.Button floated="right" basic color="green" width={8} content='Ver Total' onClick={this.handleSearchTotal.bind(this)}/>
              </Form.Group>
            </Form>
          <Divider/>
        </div>
      );
    }
    //          <Header as='h6' textAlign='center'>Por favor, vuelva cuando la misma haya comenzado</Header>
    renderElectionInactive(){
      return (
        <div>
          <Header as='h2' textAlign='center'>
            La elección aún no se encuentra activa
            <Header.Subheader>
              Por favor vuelva cuando haya comenzado
            </Header.Subheader>
          </Header>
        </div>
      )
    }

    renderFalloConsulta(){
      return (
        <div>
          {this.state.errorMessage === "" ? <Header as='h3' textAlign='center'>Aquí se podrán visualizar los primeros datos</Header> : <Header as='h3' textAlign='center'>Aún no se cargaron datos iniciales</Header>}
        </div>
      )
    }

    renderConsulta(){
      // {this.state.candidates.length === 0 || this.state.errorMessage !== ""? this.renderFalloConsulta() : <Results candidates={this.state.candidates} counts={this.state.counts} loading={this.state.loading} background={this.background} border={this.border}/>}
      if(this.state.errorMessage === ""){
        return (<Results candidates={this.state.candidates} counts={this.state.counts} loading={this.state.loading} background={this.background} border={this.border}/>)
      } else {
        return (<Header as='h3' textAlign='center'>Aquí se podrán visualizar los primeros datos</Header>)
      }
    }

    render(){
      return (
        <div>
          <Grid columns='one' divided>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  {this.state.distritos.length === 0 ? this.renderElectionInactive() : this.renderForms()}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns='one' divided>
            <Grid.Row>
                <Grid.Column>
                  <Segment>
                  {this.state.candidates.length === 0 || this.state.errorMessage !== ""? this.renderFalloConsulta() : <Results candidates={this.state.candidates} counts={this.state.counts} loading={this.state.loading} background={this.background} border={this.border}/>}
                  </Segment>
                </Grid.Column>
              </Grid.Row>
          </Grid>
        </div>
      )
    }
}

export default SearchResults


// renderEscuelas(){
//   return (
//     <Form.Dropdown
//       required
//       label='ID de la Escuela'
//       placeholder='Escuela'
//       options={this.state.escuelas}
//       selection
//       value={this.state.escuelaId}
//       onChange={this.handleEscuela.bind(this)}
//       />
//     )
// }
// renderMesas(){
//   return (
//     <Form.Dropdown
//       required
//       label='ID de la Mesa'
//       placeholder='Mesa'
//       options={this.state.mesas}
//       selection
//       value={this.state.mesaId}
//       onChange={this.handleMesa.bind(this)}
//     />
//   )
// }
