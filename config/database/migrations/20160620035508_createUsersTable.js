
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
      //table.string('id').primary();
      table.bigIncrements('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique().index();
      table.string('password').notNullable();
      //table.text('image_url');
      table.boolean('email_verified').notNullable().defaultTo(false) ;
      table.dateTime('email_verified_at');
      table.boolean('pending_reset').notNullable().defaultTo(false) ;
      table.dateTime('last_login_at');
      table.timestamps();
      table.index(['email', 'password']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
