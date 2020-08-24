import request from 'supertest';

import db from '../../src/config/database';
import app from '../../src/app';

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
      created_at: null,
      updated_at: null
    });
  });

  afterAll(async () => {
    db.destroy();
  });
});