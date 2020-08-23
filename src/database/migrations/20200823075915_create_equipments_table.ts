import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('equipments', table => {
    table.uuid('id').notNullable().primary();
    table.string('item_name').unique().notNullable();
    table.integer('points');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('equipments');
}