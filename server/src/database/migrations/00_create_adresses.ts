import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('adresses', table => {
        table.increments('id').primary();
        table.string('cep').notNullable();
        table.string('uf').notNullable();
        table.string('localidade').notNullable();
        table.string('bairro').notNullable();
        table.string('logradouro').notNullable();
        table.string('num').notNullable();
        table.string('complemento');
        table.string('referencia');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('adresses');
}