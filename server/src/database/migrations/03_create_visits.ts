import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('visits', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable()
             .references('id')
             .inTable('adresses');
        table.dateTime('datetime').notNullable();
        table.string('description').notNullable();
        table.string('image');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('visits');
}