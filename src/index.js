import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import App from './App.js'
import About from './About.js'
import Home from './Home.js'
import Tabla from './Tabla.js'
import MesaForm from './MesaForm.js'

import MesaDataLoadForm from './MesaDataLoadForm.js'
import Error404 from './ErrorComponents/Error404.js'
import SearchMesa from './SearchComponents/SearchMesa.js'
import AuthHome from './Auth/AuthHome.js'
import Register from './Auth/Register.js'

import DelegateNavBar from './Delegations/DelegateNavBar.js'
import DelegateFiscal from './Delegations/DelegateFiscal.js'
import DelegateApoderadoDePartido from './Delegations/DelegateApoderadoDePartido.js'
import DelegatePresidenteDeMesa from './Delegations/DelegatePresidenteDeMesa.js'
import DelegateVicepresidenteDeMesa from './Delegations/DelegateVicepresidenteDeMesa.js'
import DelegateDelegadoGeneral from './Delegations/DelegateDelegadoGeneral.js'
import FixedNavbarComponent from './FixedNavbarComponent.js'
import './ErrorComponents/Error404.css'

import CreateMesa2 from './prototypes/CreateMesa2.js'
import Election2 from './prototypes/Election2.js'
import AddPresidenteDeMesa2 from './prototypes/AddPresidenteDeMesa2.js'
import AddFiscal2 from './prototypes/AddFiscal2.js'
import LoadMesa2 from './prototypes/LoadMesa2.js'
import AddApoderadoDePartido2 from './prototypes/AddApoderadoDePartido2.js'
import GetMesa2 from './prototypes/GetMesa2.js'

import Login from './prototypes/login.js'
import GetUser from './prototypes/GetUser.js'

import Router2 from './prototypes/router2.js'

ReactDOM.render(
  Router2
  ,
  document.getElementById('root')
);
