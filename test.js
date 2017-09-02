const request = require('supertest')
const app = require('./app')

const defaultPath = '/api/v1/'

describe('Initial test', () => {
  it('should return 200', done => {
    request(app).get(defaultPath).expect(200).end(error => {
      if (error) throw error
      done()
    })
  })
  it('should return a JSON format', () => {
    return request(app).get(defaultPath).then(response => {
      expect(response.headers['content-type']).toEqual(
        expect.stringMatching(/json/)
      )
    })
  })
})

describe('Listing news on /news', () => {
  it('Returns 200 status code', () => {
    return request(app).get(`${defaultPath}news`).then(response => {
      expect(response.statusCode).toBe(200)
    })
  })
  it('should response with JSON', () => {
    return request(app).get(`${defaultPath}news`).then(response => {
      expect(response.headers['content-type']).toEqual(
        expect.stringMatching(/json/)
      )
    })
  })
  it('Initial state of news', () => {
    return request(app).get(`${defaultPath}news`).then(response => {
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
