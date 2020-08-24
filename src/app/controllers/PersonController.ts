import { Response, Request } from "express";
import { v4 as uuid } from 'uuid';

import PersonValidator from "../services/validators/PersonValidator";
import EquipmentValidator from "../services/validators/EquipmentValidator";
import db from "../../config/database";
import Person from "../entities/Person";
import Equipment from "../entities/Equipment";
import InfectionReport from "../entities/InfectionReport";

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
    } catch (exception) {
      return res.status(500).json({ message: 'internal server error' });
    }

    return res.status(201).json(person);
  }

  async updateLocation(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;

    let person: Person|undefined;
    try {
      person = (await db('people').where('id', id))[0];
    } catch (exception) {
      return res.status(400).json({ message: 'id is not a valid uuid' });
    }

    if (!person) {
      return res.status(404).json({ message: 'person not found' });
    }

    try {
      const personValidator = new PersonValidator(data.location);
      await personValidator.validateUpdateLocation();
    } catch (exception) {
      return res.status(400).json(exception);
    }
    
    try {
      await db('people').where('id', id).update({
        lat: data.location.lat,
        lng: data.location.lng,
      });
    } catch (exception) {
      return res.status(500).json({ message: 'internal server error' });
    }

    return res.sendStatus(204);
  }

  async updateInfected(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;
    
    let person: Person|undefined;
    try {
      person = (await db('people').where('id', id))[0];
    } catch (exception) {
      return res.status(400).json({ message: 'id is not a valid uuid' });
    }

    if (!person) {
      return res.status(404).json({ message: 'person not found' });
    }

    try {
      const personValidator = new PersonValidator(data);
      await personValidator.validateUpdateInfected();
    } catch (exception) {
      return res.status(400).json(exception);
    }

    if ((await db('infection_reports').where('reported_id', id).where('reporter_id', data.reporter_id)).length > 0) {
      return res.status(422).json({ message: 'already reported' });
    }

    try {
      const infectionReport = new InfectionReport({
        reporter_id: data.reporter_id,
        reported_id: id
      });

      await db('infection_reports').insert(infectionReport);

      if ((await db('infection_reports').where('reported_id', id)).length >= 5) {
        await db('people').where('id', id).update({
          infected: true
        }); 
      }
    } catch (exception) {
      return res.status(500).json(exception);
    }
    
    return res.sendStatus(204);
  }
}

export default new PersonController();