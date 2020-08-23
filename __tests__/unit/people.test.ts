import request from 'supertest';
import { validate as uuidValidate } from 'uuid';

import truncate from '../utils/truncate';
import db from '../../src/config/database';
import app from '../../src/app';

describe('people', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should add survivor to database', async () => {
    const response = await request(app).post('/people').send({
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896
    });

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    db.destroy();
  });
});