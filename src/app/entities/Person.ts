import { v4 as uuid } from 'uuid';

class Person {
  public readonly id: string;

  public name?: string;
  public age?: number;
  public gender?: string;
  public lat?: number;
  public lng?: number;

  public created_at: string;
  public updated_at?: string;

  constructor(props: Omit<Person, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }

    this.created_at = new Date().toISOString();
  }
}

export default Person;