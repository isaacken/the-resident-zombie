import request from 'supertest';
import { v4 as uuid } from 'uuid';

import db from '../src/config/database';
import app from '../src/app';
import Person from '../src/app/entities/Person';

describe('report survivor as infected', () => {
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

    for (let i = 0; i < 5; i++) {
      let reporterId = uuid();
      let reporter = new Person({
        name: 'John Doe',
        age: 21,
        gender: 'M',
        lat: -22.284850, 
        lng: -46.365896,
      }, reporterId);

      await db('people').insert(reporter);

      const response = await request(app).patch(`/people/flag-infected/${personId}`).send({
        reporter_id: reporterId
      });

      expect(response.status).toBe(204);
    }

    const [{ infected }] = await db('people').select('infected').where('id', personId);
    expect(infected).toBe(true);
  }); 

  afterAll(async () => {
    db.destroy();
  });
});