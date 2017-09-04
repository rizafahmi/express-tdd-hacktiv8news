const bodyParser = require('body-parser')
const news = require('./models')
const app = require('express')()

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

module.exports = app
