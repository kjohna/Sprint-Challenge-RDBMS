// Update with your config settings.
// use path module to make db connection path dynamic:
const path = require('path');
const dbPath = path.resolve(__dirname, 'data', 'gtd_project_db.sqlite3');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
  },
};
