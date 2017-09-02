const app = require('express')()

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

app.post('/api/v1/news', (req, res) => {
  res.sendStatus(201)
})

module.exports = app
