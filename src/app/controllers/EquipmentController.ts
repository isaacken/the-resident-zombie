import { Response, Request } from "express";
import { v4 as uuid } from 'uuid';

import EquipmentValidator from "../services/validators/EquipmentValidator";
import db from "../../config/database";
import Equipment from "../entities/Equipment";

class EquipmentController {
  async trade(req: Request, res: Response) {
    const data = req.body;

    try {
      const equipmentValidator = new EquipmentValidator(data);
      await equipmentValidator.validateTrade();
    } catch (exception) {
      return res.status(400).json(exception);
    }

    let trader1Items = data.trader_1.items;
    let trader1ItemsValue = 0;
    let trader2Items = data.trader_2.items;
    let trader2ItemsValue = 0;

    for (let i in trader1Items) {
      let equipment: Equipment = await db('equipments').where('item_name', trader1Items[i].item_name).first();
      trader1Items[i].equipment = equipment;
      trader1Items[i].quantityInStock = (await db('people_equipments').select('quantity')
        .where('person_id', data.trader_1.id)
        .where('equipment_id', equipment.id).first()).quantity;

      if (trader1Items[i].quantityInStock < trader1Items[i].quantity) {
        return res.status(422).json({ message: `trader 1's ${trader1Items[i].item_name} is insufficient` });
      }

      trader1ItemsValue += equipment.points! * trader1Items[i].quantity;
    }

    for (let i in trader2Items) {
      let equipment: Equipment = await db('equipments').where('item_name', trader2Items[i].item_name).first();
      trader2Items[i].equipment = equipment;
      trader2Items[i].quantityInStock = (await db('people_equipments').select('quantity')
        .where('person_id', data.trader_2.id)
        .where('equipment_id', equipment.id).first()).quantity;

      if (trader2Items[i].quantityInStock < trader2Items[i].quantity) {
        return res.status(422).json({ message: `trader 2's ${trader1Items[i].item_name} is insufficient` });
      }

      trader2ItemsValue += equipment.points! * trader2Items[i].quantity;
    }

    if (trader1ItemsValue !== trader2ItemsValue) {
      return res.status(422).json({ message: 'items points do not match' });
    }

    try {
      let trx = await db.transaction();

      for (let i in trader1Items) {
        await db('people_equipments')
          .where('person_id', data.trader_1.id)
          .where('equipment_id', trader1Items[i].equipment.id)
          .update({
            quantity: trader1Items[i].quantityInStock - trader1Items[i].quantity
          });

        let trader2ItemQuantityInStock = (await db('people_equipments').
          select('quantity').
          where('person_id', data.trader_2.id).
          where('equipment_id', trader1Items[i].equipment.id).first());

        if (!trader2ItemQuantityInStock) {
          await trx('people_equipments').insert({
            id: uuid(),
            person_id: data.trader_2.id,
            equipment_id: trader1Items[i].equipment.id,
            quantity: trader1Items[i].quantity
          });
        } else {
          await trx('people_equipments')
            .where('person_id', data.trader_2.id)
            .where('equipment_id', trader1Items[i].equipment.id)
            .update({
              quantity: (trader2ItemQuantityInStock.quantity + trader1Items[i].quantity)
            });
        }
      }

      for (let i in trader2Items) {
        await trx('people_equipments')
          .where('person_id', data.trader_2.id)
          .where('equipment_id', trader2Items[i].equipment.id)
          .update({
            quantity: trader2Items[i].quantityInStock - trader2Items[i].quantity
          });

        let trader1ItemQuantityInStock = (await db('people_equipments').
          select('quantity').
          where('person_id', data.trader_1.id).
          where('equipment_id', trader2Items[i].equipment.id).first());

        if (!trader1ItemQuantityInStock) {
          await trx('people_equipments').insert({
            id: uuid(),
            person_id: data.trader_1.id,
            equipment_id: trader2Items[i].equipment.id,
            quantity: trader2Items[i].quantity
          });
        } else {
          await trx('people_equipments')
            .where('person_id', data.trader_1.id)
            .where('equipment_id', trader2Items[i].equipment.id)
            .update({
              quantity: (trader1ItemQuantityInStock.quantity + trader2Items[i].quantity)
            });

          await trx('people_equipments')
            .where('person_id', data.trader_1.id)
            .where('equipment_id', trader2Items[i].equipment.id)
            .update({
              quantity: trader2Items[i].quantityInStock + trader2Items[i].quantity
            });  
        }
      }

      trx.commit();
    } catch (exception) {
      return res.status(500).json({ message: 'internal server error' })
    }

    return res.sendStatus(200);
  }
}

export default new EquipmentController();