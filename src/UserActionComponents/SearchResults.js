// react utilities
import React, { Component } from 'react';
import { Form, Divider, Header, Loader} from 'semantic-ui-react'
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
    componentWillMount(){
      api.getDistritos().then(resDistritos => {
        this.setState({
          distritos : resDistritos.data.map((x, idX) => {return { key : idX, value : x, text : x}})
        })
      }).catch(error => {
        console.log(error)
      })
    }

    handleSearch(event){
      api.getTotal(this.state.distritoId, this.state.escuelaId, this.state.mesaId).then(results => {
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false,
          errorMessage : ""
        })
      }).catch(error => {
        //utils.showError(this.msg, "Ingrese id de distrito, id de escuela e id de mesa")
        utils.showError(this.msg, error.response)
        this.setState({loading : false, errorMessage : error.response})
      })
      this.setState({loading : true})
    }

    handleDistrito = (event, {value}) => {
      api.getEscuelas(value).then(res => {
        this.setState({
          distritoId : value,
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

    renderEscuelas(){
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
    renderMesas(){
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

    renderFalloConsulta(){
      return (
        <div>
          {this.state.errorMessage === "" ? <Header as='h3' textAlign='center'>Realiza una consulta</Header> : <Header as='h3' textAlign='center'>Aun no se cargaron datos iniciales</Header>}
        </div>
      )
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
              {this.state.escuelas.length !== 0 ? this.renderEscuelas() : (this.state.loadingEscuelas ? <Loader active inline='centered'/> : null)}
              {this.state.mesas.length !== 0 ? this.renderMesas() : (this.state.loadingMesas ? <Loader active inline='centered'/> : null)}
            <Form.Button content='Buscar' onClick={this.handleSearch.bind(this)}/>
          </Form>
          <Divider/>
          {this.state.candidates.length === 0 || this.state.errorMessage !== ""? this.renderFalloConsulta() : <Results candidates={this.state.candidates} counts={this.state.counts} loading={this.state.loading} background={this.background} border={this.border}/>}
        </div>
      );
    }
    renderElectionInactive(){
      return (
        <div>
          <Header as='h2' textAlign='center'>La eleccion aun no se encuentra activa</Header>
          <p>Por favor vuelva cuando se haya iniciado</p>
        </div>
      )
    }
    render(){
      return this.state.distritos.length === 0 ? this.renderElectionInactive() : this.renderForms()
    }
}

export default SearchResults
