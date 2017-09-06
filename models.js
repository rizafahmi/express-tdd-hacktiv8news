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

const add = news => {
  return News().insert(news, 'id')
}

const remove = id => {
  return News().where('id', parseInt(id)).del()
}

module.exports = {
  findAll,
  find,
  add,
  remove
}
