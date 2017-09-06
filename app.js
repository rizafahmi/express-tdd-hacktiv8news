'use strict'

const bodyParser = require('body-parser')
const news = require('./models')
const app = require('express')()

// Models
const models = require('./models')

const urlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

app.get('/api/v1', (req, res) => {
  res.json({ status: 'OK' })
})

app.get('/api/v1/news', (req, res, next) => {
  news
    .findAll()
    .then(news => {
      res.json(news)
    })
    .catch(err => {
      next(err)
    })
})

app.post('/api/v1/news', urlEncodedMiddleware, (req, res, next) => {
  news
    .add(req.body)
    .then(id => {
      return news.find(id)
    })
    .then(news => {
      res.status(201).json(news)
    })
    .catch(err => next(err))
})

app.delete('/api/v1/news/:id', (req, res, next) => {
  news
    .remove(req.params.id)
    .then(data => {
      res.sendStatus(204)
    })
    .catch(err => {
      console.error(err)
    })
})

app.get('/api/v1/news/:id', (req, res) => {
  news.find(req.params.id).then(news => {
    res.json(news)
  })
})

module.exports = app
