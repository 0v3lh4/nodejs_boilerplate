'use strict'

const config = require('./config')
const path = require('path')

exports.isProduction = config.get('env') === 'production'
exports.isDevelopment = config.get('env') === 'development'

exports.rootAbsolutePath = path.join(__dirname, '..')
exports.srcAbsolutePath = __dirname
