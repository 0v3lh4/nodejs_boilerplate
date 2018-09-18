'use strict'

const config = require('./src/config')
const app = require('./src/startup')

app.listen(config.get('port'))
