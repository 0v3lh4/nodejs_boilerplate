'use strict'

const messages = require('./api/messages')

exports.addControllers = (app) => {
  // API/V1
  app.use('/api/v1/messages', messages)
}
