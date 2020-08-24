import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('infection_reports', table => {
    table.uuid('id').primary();
    table.uuid('reporter_id').notNullable();
    table.uuid('reported_id').notNullable();
    
    table
      .foreign('reporter_id')
      .references('id')
      .inTable('people')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('reported_id')
      .references('id')
      .inTable('people')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamps();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('infection_reports');
}

