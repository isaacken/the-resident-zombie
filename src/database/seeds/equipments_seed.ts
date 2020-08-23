import * as Knex from "knex";
import { v4 as uuid } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("equipments").del();

    // Inserts seed entries
    await knex("equipments").insert([
        { id: uuid(), item_name: "Fiji Water", points: 14 },
        { id: uuid(), item_name: "Campbell Soup", points: 12 },
        { id: uuid(), item_name: "First Aid Pouch", points: 10 },
        { id: uuid(), item_name: "AK47", points: 8 },
    ]);
};
