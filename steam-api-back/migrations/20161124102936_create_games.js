exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('games', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('gameName').unique().notNullable();
        table.string('posterImage').notNullable();
        table.string('gameDescription', 1000);
        table.string('releaseDate');
        table.string('platform');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('games');
};
