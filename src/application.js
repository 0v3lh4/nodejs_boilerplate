'use strict'

const path = require('path')
const express = require('express')
const env = require('./environment')
const bodyParser = require('body-parser')
const config = require('./config')

/*
 * Config middlewares
 */
exports.addMiddlewares = (app) => {
  app.use(require('morgan')('combined'))
  app.use(require('helmet')())
  app.use(require('compression')())
  app.use(bodyParser.json())
}

/*
 * Config static directory SPA for production
 */
exports.addSpaStatic = (app) => {
  if (env.isProduction) {
    app.use(express.static(path.join(env.rootAbsolutePath, 'client_app')))
  }
}

/*
 * Config SPA for development
 */
exports.addSpaProxy = (app) => {
  if (env.isDevelopment) {
    const proxy = require('http-proxy').createProxyServer()

    app.get('/*', (req, res) => {
      proxy.web(req, res, {
        target: config.get('spa_proxy_url'),
        secure: false
      })
    })
  }
}

/*
 * Notifier errors in dev
 */
exports.addErrorHandlerInDev = (app) => {
  if (env.isDevelopment) {
    const errorHandler = require('errorhandler')
    const notifier = require('node-notifier')

    const errorNotification = (_, str, req) => {
      notifier.notify({
        title: `Error verb ${req.method} route ${req.url}`,
        message: str
      })
    }

    app.use(errorHandler({ log: errorNotification }))
  }
}

/*
 * Handler errors in production
 */
exports.addErrorHandlerInProd = (app, logger) => {
  if (env.isProduction) {
    const logErrors = (err, req, res, next) => {
      logger(err)
      next(err)
    }

    const clientErrorHandler = (err, req, res, next) => {
      res.status(err.status || 500)
      res.send({ error: 'Operation not successful' })
    }

    app.use(logErrors)
    app.use(clientErrorHandler)
  }
}
