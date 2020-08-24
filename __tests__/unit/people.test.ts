import request from 'supertest';
import { v4 as uuid } from 'uuid';

import db from '../../src/config/database';
import app from '../../src/app';
import Person from '../../src/app/entities/Person';

describe('people', () => {
  it('should add survivor to database', async () => {
    const response = await request(app).post('/people').send({
      person: {
        name: 'John Doe',
        age: 21,
        gender: 'M',
        lat: -22.284850, 
        lng: -46.365896,
      },
      inventory: [
        { "item_name": "Fiji Water", "quantity": 4 },
        { "item_name": "Campbell Soup", "quantity": 5 },
        { "item_name": "Campbell Soup", "quantity": 5 },
        { "item_name": "First Aid Pouch", "quantity": 2 },
      ]
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: response.body.id,
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896,
      infected: false,
      created_at: response.body.created_at,
      updated_at: null
    });
  });

  it('should update survivor location', async () => {
    let personId = uuid();
    let person = new Person({
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896,
    }, personId);

    await db('people').insert(person);

    const response = await request(app).patch(`/people/location/${personId}`).send({
      location: {
        lat: -20.284850, 
        lng: -23.365896,
      }
    });

    const [{ lat, lng }] = await db('people').select('lat', 'lng').where('id', personId);

    expect(response.status).toBe(204);
    expect(lat).toBe(-20.284850);
    expect(lng).toBe(-23.365896);
  });  

  afterAll(async () => {
    db.destroy();
  });

  it('should flag survivor as infected', async () => {
    let personId = uuid();
    let person = new Person({
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896,
    }, personId);

    await db('people').insert(person);

    const response = await request(app).patch(`/people/flag-infected/${personId}`).send();

    expect(response.status).toBe(204);
  });  

  afterAll(async () => {
    db.destroy();
  });
});