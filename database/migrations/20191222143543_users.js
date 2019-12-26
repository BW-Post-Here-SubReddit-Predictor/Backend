
exports.up = function(knex) {
    return knex.schema
    .createTable("users", tbl => {
        tbl.increments();
        tbl
          .string("username", 64)
          .notNullable()
          .unique();
        tbl.string("password", 64)
          .notNullable();
        tbl
          .string("email", 128)
          .notNullable()
          .unique();
      })
    .createTable('posts', tbl => {
        tbl.increments();
        tbl.string('post_url', 450)
        .unique();
        tbl.text('post_description')
        .notNullable();
        tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('posts');
};
