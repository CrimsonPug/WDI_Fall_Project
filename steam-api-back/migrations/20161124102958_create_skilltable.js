
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('skills', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('user_id').notNullable();
        table.integer('game_id').notNullable();
        table.string('skillLevel').notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('skills');
};
