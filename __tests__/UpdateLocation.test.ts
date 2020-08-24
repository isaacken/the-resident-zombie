import request from 'supertest';
import { v4 as uuid } from 'uuid';

import db from '../src/config/database';
import app from '../src/app';
import Person from '../src/app/entities/Person';

describe('update survivor location', () => {
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
    await db.destroy();
  });
});