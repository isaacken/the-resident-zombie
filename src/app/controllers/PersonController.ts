import { Response, Request } from "express";
import { v4 as uuid } from 'uuid';

import PersonValidator from "../services/validators/PersonValidator";
import db from "../../config/database";
import Person from "../models/Person";

class PersonController {
  async store(req: Request, res: Response) {
    const data = req.body;

    try {
      data.id = uuid();
      const personValidator = new PersonValidator(data);
      personValidator.validateRegister();
    } catch (exception) {
      console.log(exception);
      return res.status(400).json(exception);
    }

    const person = await Person.insert(data);

    return res.status(201).json(person);
  }
}

export default new PersonController();