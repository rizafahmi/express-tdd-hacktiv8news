const bodyParser = require('body-parser')
const app = require('express')()

const urlEncodedMiddleware = bodyParser.urlencoded({ extended: false })

app.get('/api/v1', (req, res) => {
  res.json({ status: 'OK' })
})

app.get('/api/v1/news', (req, res) => {
  res.json([
    {
      title: 'Hacktiv8',
      description: 'The best ever coding bootcamp'
    }
  ])
})

app.post('/api/v1/news', urlEncodedMiddleware, (req, res) => {
  res.status(201).json(req.body)
})

module.exports = app
