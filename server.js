'use strict'

const config = require('./src/config')
const app = require('./src/startup.js')

app.listen(config.get('port'))
