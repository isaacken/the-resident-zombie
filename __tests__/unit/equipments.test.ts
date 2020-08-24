import request from 'supertest';
import { v4 as uuid } from 'uuid';

import db from '../../src/config/database';
import app from '../../src/app';
import Person from '../../src/app/entities/Person';

describe('equipments', () => {
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
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.name === 'Fiji Water').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.name === 'Campbell Soup').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.name === 'First Aid Pouch').id, quantity: 10 },
      { id: uuid(), person_id: trader1Id, equipment_id: equipments.find((e) => e.name === 'AK47').id, quantity: 10 },
    ]);
    
    let trader2Id = uuid();
    let trader2 = new Person({
      name: 'Jane Roe',
      age: 21,
      gender: 'F',
      lat: -22.284850, 
      lng: -46.365896,
    }, trader2Id);

    await db('people_equipments').insert([
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.name === 'Fiji Water').id, quantity: 10 },
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.name === 'Campbell Soup').id, quantity: 10 },
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.name === 'First Aid Pouch').id, quantity: 10 },
      { id: uuid(), person_id: trader2Id, equipment_id: equipments.find((e) => e.name === 'AK47').id, quantity: 10 },
    ]);

    await db('people').insert(trader2);

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

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    db.destroy();
  });
});