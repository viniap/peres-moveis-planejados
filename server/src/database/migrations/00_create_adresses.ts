import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('adresses', table => {
        table.increments('id').primary();
        table.string('cep').notNullable();
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.string('neighborhood').notNullable();
        table.string('street').notNullable();
        table.string('num').notNullable();
        table.string('reference');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('adresses');
}