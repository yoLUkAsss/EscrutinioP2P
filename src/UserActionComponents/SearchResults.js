// react utilities
import React, { Component } from 'react';
import { Form, Container, Divider, Header} from 'semantic-ui-react'
import AlertContainer from 'react-alert'

// componentes
import Results from '../App/Results.js'
import * as utils from '../utils/utils.js'
import * as api from '../utils/api-call.js'
import * as currentUser from '../utils/user_session.js'
import cookie from 'react-cookies'
class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
          distritoId : "",
          escuelaId : "",
          mesaId : "",
          candidato : "",
          candidates : [],
          loading : false,
          errorMessage : ""
        }
        this.background = []
        this.border = []
        this.electionActive = currentUser.getElectionCreated(cookie)
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


    handleSearchTotal(event){
      api.getTotal(this.state.candidato).then(results => {
        console.log("buscando total")
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false
        })
      }).catch(error => {
        console.log(error)
        utils.showError(this.msg, "Ingrese id de distrito, id de escuela e id de mesa")
        this.setState({loading : false, errorMessage : error.response.data})
      })
      this.setState({loading : true, errorMessage : ""})
    }

    handleSearchTotalMesa = (event) => {
      api.getTotalMesa(this.state.distritoId, this.state.escuelaId, this.state.mesaId, this.state.candidato).then(results => {
        console.log("buscando total mesa")
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false
        })
      }).catch(error => {
        utils.showError(this.msg, "Ingrese id de distrito, id de escuela e id de mesa")
        this.setState({loading : false, errorMessage : error.response.data})
      })
      this.setState({loading : true, errorMessage : ""})
    }

    handleSearchTotalEscuela = (event) => {
      api.getTotalEscuela(this.state.distritoId, this.state.escuelaId, this.state.candidato).then(results => {
        console.log("buscando total escuela")
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false
        })
      }).catch(error => {
        utils.showError(this.msg, "Ingrese id de distrit y id de escuela")
        this.setState({loading : false, errorMessage : error.response.data})
      })
      this.setState({loading : true, errorMessage : ""})
    }

    handleSearchTotalDistrito = (event) => {
      api.getTotalDistrito(this.state.distritoId, this.state.candidato).then(results => {
        console.log("buscando total distrito")
        this.setState({
          candidates : results.data.candidates,
          counts : results.data.counts,
          loading : false
        })
      }).catch(error => {
        utils.showError(this.msg, "Ingrese id de distrito")
        this.setState({loading : false, errorMessage : error.response.data})
      })
      this.setState({loading : true, errorMessage : ""})
    }

    handleCandidato = (evt) => {this.setState({ candidato : evt.target.value })}

    handleDistrito = (event, {value}) => {
      api.getEscuelas(value).then(res => {
        this.setState({
          distrito : value,
          escuelas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingEscuelas : false
        })
      }).catch(error => {
        console.log("something failed")
        this.setState({loadingEscuelas : false})
      })
      this.setState({loadingEscuelas : true, escuelas : [], mesas : []})
    }

    handleEscuela = (event, {value}) => {
      api.getMesas(this.state.distrito, value).then(res => {
        this.setState({
          escuela : value ,
          mesas : res.data.map((x, idX) => {
            return { key : idX, value : x, text : x}
          }),
          loadingMesas : false,
        })
      }).catch(error => {
        console.log("something failed")
        this.setState({loadingMesas : false})
      })
      this.setState({loadingMesas : true, mesas : []})
    }

    handleMesa = (event, {value}) => { this.setState({ mesa : value }) }

    renderEscuelas(){
      return (
        <Form.Dropdown
          required
          label='ID de la Escuela'
          placeholder='Escuela'
          options={this.state.escuelas}
          selection
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
          onChange={this.handleMesa.bind(this)}
        />
      )
    }

    renderForms () {
      return (
        <div>
          <AlertContainer ref={a => this.msg = a} {...utils.alertConfig()} />
            <Form >
              <Form.Input
                type='text'
                label='Lista a buscar'
                placeholder="Lista a buscar"
                value={this.state.candidato}
                onChange={this.handleCandidato.bind(this)}
              />
              <Form.Button content='Buscar' onClick={this.handleSearchTotal.bind(this)}/>
              <Form.Input
                type="number"
                label='ID del Distrito'
                placeholder="ID del Distrito"
                value={this.state.distritoId}
                onChange={this.handleDistrito.bind(this)}/>
              <Form.Button content='Buscar' onClick={this.handleSearchTotalDistrito.bind(this)}/>
              {this.state.escuelas.length !== 0 ? this.renderEscuelas() : (this.state.loadingEscuelas ? <Loader active inline='centered'/> : null)}
              {this.state.mesas.length !== 0 ? this.renderMesas() : (this.state.loadingMesas ? <Loader active inline='centered'/> : null)}
              <Form.Input
                type="number"
                label='ID de la Escuela'
                placeholder="ID de la Escuela"
                value={this.state.escuelaId}
                onChange={this.handleEscuela.bind(this)}/>
              <Form.Button content='Buscar' onClick={this.handleSearchTotalEscuela.bind(this)}/>
              <Form.Input
                type="number"
                label='ID de la Mesa'
                placeholder="ID de la Mesa"
                value={this.state.mesaId}
                onChange={this.handleMesa.bind(this)}/>

            <Form.Button content='Buscar' onClick={this.handleSearchTotalMesa.bind(this)}/>
          </Form>
          <Divider/>
          <Results candidates={this.state.candidates} counts={this.state.counts} loading={this.state.loading} background={this.background} border={this.border} errorMessage={this.state.errorMessage}/>
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
      return !this.electionActive ? this.renderElectionInactive() : this.renderForms()
    }

}

export default SearchResults
