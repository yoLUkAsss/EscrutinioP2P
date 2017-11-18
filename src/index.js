import ReactDOM from 'react-dom'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App/App.css'
import 'semantic-ui-css/semantic.min.css'
import './ErrorComponents/Error404.css'

// /**
//  * Auth Components
//  */
// import App from './App/app.js'
// import Home from './App/Home.js'
// import Login from './Auth/login.js'
// import Register from './Auth/Register.js'

// /**
//  * Navbar Components
//  */
// import FixedNavbarComponent from './App/FixedNavbarComponent.js'

// /**
//  * Error Components
//  */
// import Error404 from './ErrorComponents/Error404.js'
// import './ErrorComponents/Error404.css'

import CustomRouter from './Router/router.js'


ReactDOM.render(
  CustomRouter
  ,
  document.getElementById('root')
);
