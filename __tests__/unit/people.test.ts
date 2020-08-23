import request from 'supertest';

import truncate from '../utils/truncate';
import db from '../../src/config/database';
import app from '../../src/app';

describe('people', () => {
  beforeEach(async () => {
    await truncate();
  });

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
  });

  afterAll(async () => {
    db.destroy();
  });
});