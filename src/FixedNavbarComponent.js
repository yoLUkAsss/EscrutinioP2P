import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'

class FixedNavbarComponent extends Component {

  render() {
    return (
    <div>
      <Menu fixed='top' inverted>
        <Menu.Item as='a' href='/' header>Home</Menu.Item>
        <Menu.Item as='a' href='/createelection'>Crear eleccion</Menu.Item>
        <Menu.Item as='a' href='/createmesa'>Creacion de mesas</Menu.Item>
        <Menu.Item as='a' href='/loadmesa'>Carga de datos</Menu.Item>
        <Menu.Item as='a' href='/getmesa'>Busqueda de datos</Menu.Item>
        <Menu.Item as='a' href='/addpresidente'>Agregar presidente de mesa</Menu.Item>
        <Menu.Item as='a' href='/addfiscal'>Agregar fiscal de mesa</Menu.Item>
        <Menu.Item as='a' href='/addapoderado'>Agregar apoderado de partido</Menu.Item>
        <Menu.Item as='a' href='/about'>Sobre nosotros</Menu.Item>
      </Menu>
    </div>
    );
  }
}
export default FixedNavbarComponent
