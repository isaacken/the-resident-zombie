import validator from 'validator';
import ValidationException from '../../exceptions/ValidationException';

class PersonValidator {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  public async validateRegister() {
    if (validator.isEmpty(this.data.name)) {
      throw new ValidationException('name', 'cannot be empty');
    }

    if (!this.data.age) {
      throw new ValidationException('age', 'cannot be empty');
    }

    if (validator.isEmpty(this.data.gender)) {
      throw new ValidationException('gender', 'cannot be empty');
    }

    if (!this.data.lat) {
      throw new ValidationException('latitude', 'cannot be empty');
    }

    if (!this.data.lng) {
      throw new ValidationException('longitude', 'cannot be empty');
    }

    if (this.data.name.length > 255) {
      throw new ValidationException('name', 'cannot be longer than 255 characters');
    }

    if (typeof this.data.age !== 'number') {
      throw new ValidationException('age', 'should be a number');
    }

    if (this.data.gender !== 'M' && this.data.gender !== 'F') {
      throw new ValidationException('gender', 'value should be \'M\' (male) or \'F\' (female)');
    }

    if (typeof this.data.lat !== 'number') {
      throw new ValidationException('latitude', 'should be a number');
    }

    if (typeof this.data.lng !== 'number') {
      throw new ValidationException('longitude', 'should be a number');
    }

    if (this.data.lat < -90 || this.data.lat > 90) {
      throw new ValidationException('latitude', 'should be between -90 and 90');
    }

    if (this.data.lng < -180 || this.data.lng > 180) {
      throw new ValidationException('longitude', 'should be between -180 and 180');
    }
  }

  public async validateUpdateLocation() {
    if (!this.data.lat) {
      throw new ValidationException('latitude', 'cannot be empty');
    }

    if (!this.data.lng) {
      throw new ValidationException('longitude', 'cannot be empty');
    }

    if (typeof this.data.lat !== 'number') {
      throw new ValidationException('latitude', 'should be a number');
    }

    if (typeof this.data.lng !== 'number') {
      throw new ValidationException('longitude', 'should be a number');
    }

    if (this.data.lat < -90 || this.data.lat > 90) {
      throw new ValidationException('latitude', 'should be between -90 and 90');
    }

    if (this.data.lng < -180 || this.data.lng > 180) {
      throw new ValidationException('longitude', 'should be between -180 and 180');
    }
  }
}

export default PersonValidator;