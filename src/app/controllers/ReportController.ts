import { Request, Response } from "express";
import db from "../../config/database";

class ReportController {
  async infectedSurvivors(req: Request, res: Response) {
    const totalPeople = (await db('people')).length;
    const infectedPeople = (await db('people').where('infected', true)).length;

    return res.json({
      infected_people: totalPeople? infectedPeople / totalPeople : 0
    });
  }
  
  async nonInfectedSurvivors(req: Request, res: Response) {
    const totalPeople = (await db('people')).length;
    const nonInfectedPeople = (await db('people').where('infected', false)).length;

    return res.json({
      non_infected_people: totalPeople? nonInfectedPeople / totalPeople : 0
    });
  }

  async itemsPerSurvivor(req: Request, res: Response) {
    const equipments = await db('equipments').select('item_name', 'id');
    const totalPeople = (await db('people')).length;

    for (let i in equipments) {
      let quantity = (await db('people_equipments').sum('quantity').where('equipment_id', equipments[i].id))[0].sum;
      equipments[i].quantity_per_survivor = quantity / totalPeople;
      delete equipments[i].id;
    }

    return res.json(equipments);
  }
}

export default new ReportController();