
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex('projects')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
            id: 1,
            name: "finish sprint",
            description: "complete sprint tasks and submit",
            completed: false
        },
        {
            id: 2,
            name: "lunch break",
            description: "make lunch, eat it",
            completed: false
        },
        {
            id: 3,
            name: "exercise",
            description: "bike ride",
            completed: false
        }
    ]);
    });
};
