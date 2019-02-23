
exports.up = function(knex, Promise) {
  return knex.schema
  // ***** projects table *****
  .createTable('projects', tbl => {
    // primary key
    tbl.increments();
    // project name
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    // project description
    tbl
      .text('description')
      .notNullable();
    // completed flag
    tbl
      .boolean('completed');
  })
  // ***** actions table *****
  .createTable('actions', tbl => {
    // primary key
    tbl.increments();
    // foreign key -> project id
    tbl
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    // action description
    tbl
      .string('description', 128)
      .notNullable();
    // action notes
    tbl.text('notes');
    // completed flag
    tbl
    .boolean('completed');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions');
};
