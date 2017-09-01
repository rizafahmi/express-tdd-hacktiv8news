const app = require('express')()

app.get('/', (req, res) => {
  res.send('OK')
})
app.get('/news', (req, res) => {
  res.json({ status: 'OK' })
})

module.exports = app
