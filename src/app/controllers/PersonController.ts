import { Response, Request } from "express";
import { v4 as uuid } from 'uuid';

import PersonValidator from "../services/validators/PersonValidator";
import EquipmentValidator from "../services/validators/EquipmentValidator";
import db from "../../config/database";
import Person from "../entities/Person";
import Equipment from "../entities/Equipment";

class PersonController {
  async store(req: Request, res: Response) {
    const data = req.body;

    let personData = new Person(data.person);

    let inventoryData = data.inventory;

    try {
      data.id = uuid();
      const personValidator = new PersonValidator(personData);
      await personValidator.validateRegister();
      
      const equipmentValidator = new EquipmentValidator(inventoryData);
      await equipmentValidator.validateRegister();
    } catch (exception) {
      return res.status(400).json(exception);
    }
    
    let person: Person | any;
     
    try {
      let trx = await db.transaction();
      person = (await trx('people').returning('*').insert(personData))[0];

      for (let i in inventoryData) {
        let equipment: Equipment = await db('equipments').where('item_name', 'Fiji Water').first();

        inventoryData[i].id = uuid();
        inventoryData[i].person_id = person.id;
        inventoryData[i].equipment_id = equipment.id;
        delete inventoryData[i].item_name;
      }
  
      await trx('people_equipments').insert(inventoryData);
  
      trx.commit();
    } catch (ex) {
      return res.status(500).json({ message: 'internal server error' });
    }

    return res.status(201).json(person);
  }
}

export default new PersonController();