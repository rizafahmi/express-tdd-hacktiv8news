const request = require('supertest')
const models = require('./models')
const app = require('./app')
const r = models.thinky.r
const News = require('./models/news').News

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

const newsData = { title: 'New News', description: 'A brand new news' }

describe('Listing news on /news', () => {
  beforeEach(() => {
    const news = new News(newsData)
    news
      .save()
      .then(result => {
        console.log('Seeding...')
      })
      .error(err => console.log(err))
  })
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
      models.getAllNews().then(news => {
        console.log(news)
        expect(response.text).toEqual(JSON.stringify(news))
      })
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
