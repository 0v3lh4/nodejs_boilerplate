'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.send({ message: 'Hello World!!!' })
  throw new Error('Mensagem de error')
})

module.exports = router
