'use strict'

const express = require('express')
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  res.send({ message: 'Hello World!!!' })
  res.end()
})

module.exports = router
