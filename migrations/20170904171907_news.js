exports.up = (knex, Promise) => {
  return knex.schema.createTable('news', table => {
    table.increments()
    table.string('title').notNullable().unique()
    table.text('description')
    table.timestamp('created_at').default(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('news')
}
