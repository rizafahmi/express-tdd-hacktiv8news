const bodyParser = require('body-parser')
const news = require('./models')
const app = require('express')()

const urlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

app.get('/api/v1', (req, res) => {
  res.json({ status: 'OK' })
})

app.get('/api/v1/news', (req, res, next) => {
  news
    .getAll()
    .then(news => {
      res.json(news)
    })
    .catch(err => {
      next(err)
    })
})

app.post('/api/v1/news', urlEncodedMiddleware, (req, res) => {
  res.status(201).json(req.body)
})

module.exports = app
