'use strict'

const path = require('path')
const httpProxy = require('http-proxy')
const config = require('./config')

const express = require('express')
const app = express()
const controllers = require('./controllers')

const isProduction = config.get('env') === 'production'
const clientAppPath = path.join(__dirname, '..', 'client_app')

// controllers
app.use('/api/v1/messages', controllers.api.messages)

// SPA Config
if (isProduction) {
  // config static directory SPA for production
  app.use(express.static(clientAppPath))
} else {
  const proxy = httpProxy.createProxyServer()

  app.get('*', (req, res) => {
    proxy.web(req, res, { target: config.get('spa_proxy_url') })
  })
}

module.exports = app
