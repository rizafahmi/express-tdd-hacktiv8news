const app = require('express')()

app.get('/', (req, res) => {
  res.send('OK')
})

module.exports = app
