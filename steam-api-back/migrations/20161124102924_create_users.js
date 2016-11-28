exports.up = function(knex, Promise) {
   return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.string('userBio');
        table.integer('age');
    })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users');
};