'use strict'

const express = require('express')

const app = express()

// middlewares
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!!!')
  res.end()
})

module.exports = app

