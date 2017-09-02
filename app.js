const app = require('express')()

app.get('/', (req, res) => {
  res.send('OK')
})
app.get('/news', (req, res) => {
  res.json([
    {
      title: 'Hacktiv8',
      description: 'The best ever coding bootcamp'
    }
  ])
})

module.exports = app
