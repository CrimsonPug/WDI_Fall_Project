// Update with your config settings.
module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || { 
    user: 'postgres', // or other user if you made one
    password: 'postgres', 
    database: 'games' 
  }
};