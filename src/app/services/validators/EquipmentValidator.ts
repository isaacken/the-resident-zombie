import validator from 'validator';
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

      if (!await db('equipments').where('item_name', element.item_name).count()) {
        throw new ValidationException('item name', `${element.item_name} is not valid`);
      }
    });
  }
}

export default EquipmentValidator;