class ValidationException {
  public field: string;
  public message: string;


  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }

  public get() {
    return {
      field: this.field,
      message: this.message,
    }
  }
}

export default ValidationException;