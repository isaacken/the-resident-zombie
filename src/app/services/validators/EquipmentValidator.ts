import validator from 'validator';
import { validate as validateUuid } from 'uuid';

import ValidationException from '../../exceptions/ValidationException';
import db from '../../../config/database';

class EquipmentValidator {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  public async validateRegister() {
    if (this.data.length <= 0) {
      throw new ValidationException('inventory', 'cannot be empty');
    }

    this.data.forEach(async (element: any) => {
      if (validator.isEmpty(element.item_name)) {
        throw new ValidationException('item name', 'cannot be empty');
      }
  
      if (!element.quantity) {
        throw new ValidationException('quantity', 'cannot be empty');
      }

      if (typeof element.quantity !== 'number') {
        throw new ValidationException('quantity', 'should be a number');
      }

      if (!(await db('equipments').where('item_name', element.item_name)).length) {
        throw new ValidationException('item name', `${element.item_name} is not valid`);
      }
    });
  }

  public async validateTrade() {
    if (validator.isEmpty(this.data.trader_1.id) || validator.isEmpty(this.data.trader_1.id)) {
      throw new ValidationException('trader id', 'cannot be empty');
    }

    if (!this.data.trader_1.items.length || !this.data.trader_1.items.length) {
      throw new ValidationException('items', 'cannot be empty');
    }

    if (!validateUuid(this.data.trader_1.id)) {
      throw new ValidationException('trader 1 id', 'is not a valid uuid');
    }
    
    if (!validateUuid(this.data.trader_2.id)) {
      throw new ValidationException('trader 2 id', 'is not a valid uuid');
    }

    if (!(await db('people').where('id', this.data.trader_1.id)).length) {
      throw new ValidationException('trader 1 id', 'is not registered');
    }

    if (!(await db('people').where('id', this.data.trader_2.id)).length) {
      throw new ValidationException('trader 2 id', 'is not registered');
    }

    this.data.trader_1.items.forEach(async (element: any) => {
      if (validator.isEmpty(element.item_name)) {
        throw new ValidationException('item name', 'cannot be empty');
      }
  
      if (!element.quantity) {
        throw new ValidationException('quantity', 'cannot be empty');
      }

      if (typeof element.quantity !== 'number') {
        throw new ValidationException('quantity', 'should be a number');
      }

      if (!(await db('equipments').where('item_name', element.item_name)).length) {
        throw new ValidationException('item name', `${element.item_name} is not valid`);
      }
    });
  }
}

export default EquipmentValidator;