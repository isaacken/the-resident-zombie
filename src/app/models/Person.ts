
import Model from './Model';

class Person extends Model {
  static get tableName() {
    return 'people';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'name', 'age', 'gender', 'lat', 'lng' ],
      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        age: { type: 'number' },
        gender: { type: 'string', enum: ['M', 'F']  },
        lat: { type: 'number', minimum: -90, maximum: 90 },
        lng: { type: 'number', minimum: -180, maximum: 180 },
      }
    };
  }
}

export default Person;