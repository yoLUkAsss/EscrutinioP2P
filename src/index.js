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

ReactDOM.render(
  <div>
    <div>
      <FixedNavbarComponent/>
    </div>
    <div>
    <Router>

      <Switch>

        {/* Paths for Router React */}
        <Route exact path="/" component={Home}/>
        <Route exact path="/createelection" component={Election2}/>
        <Route exact path="/createmesa" component={CreateMesa2}/>
        <Route exact path="/loadmesa" component={LoadMesa2}/>
        <Route exact path="/getmesa" component={GetMesa2}/>
        <Route exact path="/addpresidente" component={AddPresidenteDeMesa2}/>
        <Route exact path="/addfiscal" component={AddFiscal2}/>
        <Route exact path="/addapoderado" component={AddApoderadoDePartido2}/>

        <Route exact path="/login" component={Login}/>

        <Route exact path="/app" component={App}/>
        // <Route exact path="/createMesa" component={MesaForm}/>
        // <Route exact path="/loadMesa" component={MesaDataLoadForm}/>
        // <Route exact path="/searchMesa" component={SearchMesa}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/tabla" component={Tabla}/>
        <Route exact path="/auth" component={AuthHome}/>
        <Route exact path="/delegate" component={DelegateNavBar}/>
        <Route exact path="/delegate/apoderadoPartido" component={DelegateApoderadoDePartido} />
        <Route exact path="/delegate/fiscal" component={DelegateFiscal} />
        <Route exact path="/delegate/presidenteMesa" component={DelegatePresidenteDeMesa} />
        <Route exact path="/delegate/vicepresidenteMesa" component={DelegateVicepresidenteDeMesa} />
        <Route exact path="/delegate/delegadoGeneral" component={DelegateDelegadoGeneral} />

        {/* Final matches every other path - renders Error 404 not found */}
        <Route component={Error404} />
      </Switch>
    </Router>
    </div>
  </div>,
  document.getElementById('root')
);
