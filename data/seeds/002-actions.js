
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex('actions')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
            id: 1,
            project_id: 1,
            description: "finish endpoints",
            notes: "write and test endpoints required for MVP",
            completed: true
        },
        {
            id: 2,
            project_id: 1,
            description: "do some stretch",
            notes: "write and test endpoints required for stretch",
            completed: true
        },
        {
            id: 3,
            project_id: 2,
            description: "make lunch",
            notes: "get sandwich ingredients out, assemble",
            completed: false
        },
        {
            id: 4,
            project_id: 2,
            description: "eat lunch",
            notes: "eat sandwich",
            completed: false
        },
        {
            id: 5,
            project_id: 1,
            description: "push final edits",
            notes: "> git push",
            completed: false
        },
        {
            id: 6,
            project_id: 1,
            description: "complete retrospective",
            notes: "follow link to airtable, complete form",
            completed: false
        },
        {
            id: 7,
            project_id: 3,
            description: "wear bike clothes",
            notes: "change into bike clothes",
            completed: false
        },
        {
            id: 8,
            project_id: 3,
            description: "get on bike",
            notes: "go to garage, get bike out, get on",
            completed: false
        },
        {
            id: 9,
            project_id: 3,
            description: "ride bike",
            notes: "ride bike down street and to the trail then back",
            completed: false
        }
    ]);
    });
};
