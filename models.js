const env = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)

const News = () => {
  return knex('news')
}

const findAll = () => {
  return News().select()
}

const find = id => {
  return News().where('id', parseInt(id)).first()
}

const add = show => {
  return News().insert(show, 'id')
}

module.exports = {
  findAll,
  find,
  add
}
