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
    expect(uuidValidate(response.body.id)).toBeTruthy();
    expect(response.body).toEqual({
      id: response.body.id,
      name: 'John Doe',
      age: 21,
      gender: 'M',
      lat: -22.284850, 
      lng: -46.365896,
      infected: false,
      created_at: response.body.created_at,
      updated_at: response.body.updated_at
    });
  });

  afterAll(async () => {
    db.destroy();
  });
});