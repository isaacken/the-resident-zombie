import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('people', table => {
    table.uuid('id').notNullable().primary();
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.enum('gender', ['M', 'F']).notNullable();
    table.float('lat').notNullable();
    table.float('lng').notNullable();
    table.boolean('infected').defaultTo(false).notNullable();

    table.timestamps();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('people');
}