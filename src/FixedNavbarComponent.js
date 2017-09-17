import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'

class FixedNavbarComponent extends Component {

  render() {
    return (
    <div>
      <Menu fixed='top' inverted>
        <Menu.Item as='a' href='/' header>Home</Menu.Item>
        <Menu.Item as='a' href='/app'>Crear eleccion</Menu.Item>
        <Menu.Item as='a' href='/createMesa'>Creacion de mesas</Menu.Item>
        <Menu.Item as='a' href='/loadMesa'>Carga de datos</Menu.Item>
        <Menu.Item as='a' href='/searchMesa'>Busqueda de datos</Menu.Item>
        <Menu.Item as='a' href='/about'>Sobre nosotros</Menu.Item>
      </Menu>
    </div>
    );
  }
}
export default FixedNavbarComponent
