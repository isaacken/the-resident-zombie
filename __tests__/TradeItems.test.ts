import request from 'supertest';
import { v4 as uuid } from 'uuid';

import db from '../src/config/database';
import app from '../src/app';
import Person from '../src/app/entities/Person';

describe('trade items', () => {
  it('should trade items between two people', async () => {
    const equipments = await db('equipments').select('*');

    let trader1Id = uuid();
    let trader1 = new Person({
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896,
    }, trader1Id);

    await db('people').insert(trader1);

    await db('people_equipments').insert([
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.item_name === 'Fiji Water').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.item_name === 'Campbell Soup').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.item_name === 'First Aid Pouch').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.item_name === 'AK47').id, quantity: 10 },
    ]);
    
    let trader2Id = uuid();
    let trader2 = new Person({
      name: 'Jane Roe',
      age: 21,
      gender: 'F',
      lat: -22.284850, 
      lng: -46.365896,
    }, trader2Id);

    await db('people').insert(trader2);

    await db('people_equipments').insert([
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.item_name === 'Fiji Water').id, quantity: 10 },
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.item_name === 'Campbell Soup').id, quantity: 10 },
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.item_name === 'First Aid Pouch').id, quantity: 10 },
    ]);

    const response = await request(app).post('/trade').send({
      trader_1: {
        id: trader1Id,
        items: [
          { item_name: 'First Aid Pouch', quantity: 1 },
          { item_name: 'AK47', quantity: 2 }
        ]
      },
      trader_2: {
        id: trader2Id,
        items: [
          { item_name: 'Fiji Water', quantity: 1 },
          { item_name: 'Campbell Soup', quantity: 1 }
        ]
      }
    });

    await db.destroy();
    await db.initialize();

    const firstAid_t1 = (await db('people_equipments').select('quantity')
        .where('person_id', trader1Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'First Aid Pouch').id)
        .first());
    const ak47_t1 = (await db('people_equipments').select('quantity')
        .where('person_id', trader1Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'AK47').id)
        .first());
    const fijiWater_t1 = (await db('people_equipments').select('quantity')
        .where('person_id', trader1Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'Fiji Water').id)
        .first());
    const campbellSoup_t1 = (await db('people_equipments').select('quantity')
        .where('person_id', trader1Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'Campbell Soup').id)
        .first());

    const firstAid_t2 = (await db('people_equipments').select('quantity')
        .where('person_id', trader2Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'First Aid Pouch').id)
        .first());
    const ak47_t2 = (await db('people_equipments').select('quantity')
        .where('person_id', trader2Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'AK47').id)
        .first());
    const fijiWater_t2 = (await db('people_equipments').select('quantity')
        .where('person_id', trader2Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'Fiji Water').id)
        .first());
    const campbellSoup_t2 = (await db('people_equipments').select('quantity')
        .where('person_id', trader2Id)
        .where('equipment_id', equipments.find((e) => e.item_name === 'Campbell Soup').id)
        .first());

    expect(response.status).toBe(200);

    expect(firstAid_t2.quantity).toBe(11);
    expect(fijiWater_t2.quantity).toBe(9);
    expect(ak47_t2.quantity).toBe(2);
    expect(campbellSoup_t2.quantity).toBe(9);

    expect(firstAid_t1.quantity).toBe(9);
    expect(ak47_t1.quantity).toBe(8);
    expect(fijiWater_t1.quantity).toBe(11);
    expect(campbellSoup_t1.quantity).toBe(11);
  });

  afterAll(async () => {
    await db.destroy();
  });
});