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
}

export default new ReportController();