import { Model as ObjectionModel } from 'objection';
import db from '../../config/database';

ObjectionModel.knex(db);

class Model extends ObjectionModel {
  public created_at: string | undefined;
  public updated_at: string | undefined;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default Model;