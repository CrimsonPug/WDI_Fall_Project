
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('comments', function (table) {
        table.increments('comment_id').primary(); // adds incrementing int for id
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.string('sender_id').notNullable();
        table.string('recipient_id').notNullable();
        table.string('comment');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
