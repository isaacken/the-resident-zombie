import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('people_equipments', table => {
    table.uuid('id').primary();
    table.uuid('person_id').notNullable();
    table.uuid('equipment_id').notNullable();
    table.integer('quantity').defaultTo(0).notNullable();

    table
      .foreign('person_id')
      .references('id')
      .inTable('people')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('equipment_id')
      .references('id')
      .inTable('equipments')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('people_equipments');
}

