
import Model from './Model';
import { v4 as uuid } from 'uuid';

class Person extends Model {
  constructor() {
    super('people');
  }

  public async insert(data: any) {
    data.id = uuid();
    return await super.insert(data);
  }
}

export default new Person();