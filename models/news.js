const thinky = require('./index')
const r = thinky.r

const News = thinky.createModel('News', {
  id: String,
  title: String,
  description: String,
  date: { _type: Date, default: r.now() }
})

News.ensureIndex('date')

module.exports = {
  getAllNews: () => {
    return News.orderBy({ index: 'date' }).run()
  },
  News
}
