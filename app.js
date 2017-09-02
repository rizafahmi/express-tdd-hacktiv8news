const app = require('express')()

app.get('/', (req, res) => {
  res.send('OK')
})
app.get('/news', (req, res) => {
  res.json('OK')
})

module.exports = app
