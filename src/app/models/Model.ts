import db from '../../config/database';
import Knex, { QueryBuilder } from 'knex';

class Model {
  public query: Knex.QueryBuilder;

  constructor (table: string) {
    this.query = db(table);
  }

  public async insert (data: any): Promise<any> {
    data.created_at = new Date().toISOString();
    const result = await this.query.returning('*').insert(data);

    return result;
  }

  public async find(id: string): Promise<any> {
    const result = await this.query.where('id', id).first();

    return result;
  }
}

export default Model;