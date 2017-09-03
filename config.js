let config = {
  host: 'localhost',
  port: 28015,
  db: 'hacktiv8news'
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'hacktiv8news_test'
}

module.exports = config
