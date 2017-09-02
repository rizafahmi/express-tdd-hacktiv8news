const request = require('supertest')
const app = require('./app')

describe('Initial test', () => {
  test('It should return 200', done => {
    request(app).get('/').expect(200).end(error => {
      if (error) throw error
      done()
    })
  })
})

describe('Listing news on /news', () => {
  test('Returns 200 status code', () => {
    return request(app).get('/news').then(response => {
      expect(response.statusCode).toBe(200)
    })
  })
  test('should response with JSON', () => {
    return request(app).get('/news').then(response => {
      expect(response.headers['content-type']).toEqual(
        expect.stringMatching(/json/)
      )
    })
  })
  test('Initial state of news', () => {
    return request(app).get('/news').then(response => {
      expect(response.text).toEqual(
        JSON.stringify([
          {
            title: 'Hacktiv8',
            description: 'The best ever coding bootcamp'
          }
        ])
      )
    })
  })
})
