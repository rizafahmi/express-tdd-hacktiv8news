const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const News = () => {
  return knex('news')
}

const getAll = () => {
  return News().select()
}

module.exports = {
  getAll
}
