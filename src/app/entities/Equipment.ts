import { v4 as uuid } from 'uuid';

class Equipment {
  public readonly id: string;

  public item_name?: string;
  public points?: number;

  constructor(props: Omit<Equipment, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
  }
}

export default Equipment;