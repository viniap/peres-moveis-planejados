import  Knex  from 'knex';

export async function seed(knex: Knex){

    await knex('images').insert([

        { title: 'Escrivaninha', class: 'escrivaninha', image: 'escrivaninha1.jpg' },
        { title: 'Painel', class: 'painel', image: 'painel1.jpg' },

    ]);

}