const request = require('request')
let express    = require('express')
let app        = express()
let bodyParser = require('body-parser')
let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10)
import { electionInstance, web3 } from '../utils/web3-utils.js'

//ESTE ARCHIVO NO SIRVE PARA NADA

module.exports = (app, express) => {

	const api = express.Router()
  /////////////////////////////////////////////////////////////////////////////
  // GET API calls
  /////////////////////////////////////////////////////////////////////////////
	api.get('/', (req, res) => {
    res.json({result : "hola"})
	})
	return api;
}
