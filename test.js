const request = require('supertest')
const app = require('./app')

describe('Initial test', () => {
  it('It should return 200', done => {
    request(app).get('/').expect(200).end(error => {
      if (error) throw error
      done()
    })
  })
})

describe('Listing news on /news', () => {
  it('Returns 200 status code', () => {
    return request(app).get('/news').then(response => {
      expect(response.statusCode).toBe(200)
    })
  })
})
