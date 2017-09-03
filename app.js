'use strict'

const bodyParser = require('body-parser')
const app = require('express')()

// Models
const models = require('./models')

const urlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

const news = [
  {
    title: 'Hacktiv8',
    description: 'The best ever coding bootcamp'
  },
  {
    title: 'New News',
    description: 'A brand new news.'
  }
]

app.get('/api/v1', (req, res) => {
  res.json({ status: 'OK' })
})

app.get('/api/v1/news', (req, res) => {
  models.getAllNews().then(news => {
    res.json(news)
  })
})

app.post('/api/v1/news', urlEncodedMiddleware, (req, res) => {
  res.status(201).json(req.body)
})

module.exports = app
