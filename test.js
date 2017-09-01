const request = require('supertest')
const app = require('./app')

describe('Sanity check', () => {
  test('It should return 200', done => {
    request(app).get('/').expect(200).end(error => {
      if (error) throw error
      done()
    })
  })
})
