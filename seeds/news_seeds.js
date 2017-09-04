exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('news').del().then(function () {
    // Inserts seed entries
    return knex('news').insert([
      {
        title: 'A Brand New News',
        description: 'This is a brand new news.'
      },
      {
        title: 'Yet Another News',
        description: 'And this is not a new news, just yet another news.'
      }
    ])
  })
}
