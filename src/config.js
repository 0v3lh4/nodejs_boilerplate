'use strict'

const path = require('path')
const convict = require('convict')

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  port: {
    doc: 'The port to bind',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },

  spa_proxy_url: {
    doc: 'URL SPA proxy',
    format: 'url',
    default: 'http://localhost:3000'
  }
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `configs/${env}.json`))

config.validate({ allowed: 'strict' })

module.exports = config
