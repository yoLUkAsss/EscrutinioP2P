import path from 'path'
import express from 'express'
import logger from 'morgan'
import serverConfig from './server/config'
import bodyParser from 'body-parser'
import routes from './server/routes/index-route.js'
const app = express()

// Console the logger
if (serverConfig.env === 'development') {
  app.use(logger('dev'))
}

// Middlewares
app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Route api
app.use('/api', routes)

// Default - Route WildCard
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname,'dist','index.html'))
})

// Start Server
app.listen(serverConfig.port, function() {
  console.log(`Listening on ${serverConfig.base_url}`)
})
