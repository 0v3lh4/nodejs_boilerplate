'use strict'

const path = require('path')
const httpProxy = require('http-proxy')
const config = require('./config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const controllers = require('./controllers')

const isProduction = config.get('env') === 'production'
const isDevelopment = config.get('env') === 'development'

/*
 * Config static directory SPA for production
 */
const configSpaStatic = () => {
  if (isProduction) {
    app.use(express.static(path.join(__dirname, '..', 'client_app')))
  }
}

/*
 * Config SPA for development
 */
const configSpaProxy = () => {
  if (isDevelopment) {
    const proxy = httpProxy.createProxyServer()

    app.get('*', (req, res) => {
      proxy.web(req, res, { target: config.get('spa_proxy_url') })
    })
  }
}

/*
 * Config middleware
 */
const configMiddlewares = () => {
  app.use(bodyParser.json())
}

/*
 * Config controllers
 */
const configControllers = () => {
  app.use('/api/v1/messages', controllers.api.messages)
}

/*
 * Notifier errors in development
 */
const configErrorHandler = () => {
  if (isDevelopment) {
    const notifier = require('node-notifier')

    app.use(errorHandler({
      log: (_, message, req) => {
        const title = `Erro no método ${req.method} na url ${req.url}`

        notifier.notify({
          title,
          message
        })
      }
    }))
  }
}

configSpaStatic()
configMiddlewares()
configControllers()
configSpaProxy()
configErrorHandler()

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({'errors': {
    message: err.message,
    error: {}
  }})
})

module.exports = app
