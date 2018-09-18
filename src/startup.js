'use strict'

const app = require('express')()

const {
  addMiddlewares,
  addSpaStatic,
  addSpaProxy,
  addErrorHandler
} = require('./application')

const controllers = require('./controllers')

addSpaStatic(app)
addMiddlewares(app)

// Controllers
app.use('/api/v1/messages', controllers.api.messages)

addSpaProxy(app)
addErrorHandler(app)

module.exports = app
