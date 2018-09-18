'use strict'

const app = require('express')()

const {
  addMiddlewares,
  addSpaStatic,
  addSpaProxy,
  addErrorHandlerInDev,
  addErrorHandlerInProd
} = require('./application')

const { addControllers } = require('./controllers')

addSpaStatic(app)
addMiddlewares(app)

addControllers(app)

addSpaProxy(app)
addErrorHandlerInDev(app)
addErrorHandlerInProd(app, (err) => console.error(err.stack))

module.exports = app
