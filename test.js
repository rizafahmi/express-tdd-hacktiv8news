process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('./app')
const config = require('./knexfile.js')['test']
const knex = require('knex')(config)

const defaultPath = '/api/v1/'

beforeAll(() => {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex.seed.run()
    })
})
afterAll(() => {
  return knex.migrate.rollback()
})

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
      const responseObj = JSON.parse(response.text)
      expect(responseObj.length).toEqual(2)
      expect(responseObj[0].title).toEqual('A Brand New News')
      expect(responseObj[1].title).toEqual('Yet Another News')
    })
  })
})

describe('Create new news', () => {
  test('Returns 201 status code', () => {
    return request(app)
      .post(`${defaultPath}news`)
      .send('title=new+news&description=a+brand+new+news')
      .then(response => {
        expect(response.statusCode).toEqual(201)
      })
  })
  it('Returns a news object', () => {
    return request(app)
      .post(`${defaultPath}news`)
      .send('title=Yet+Another+New+News&description=Yet+another+new+news')
      .then(response => {
        expect(response.body).toEqual({
          title: 'Yet Another New News',
          description: 'Yet another new news'
        })
      })
  })
})
