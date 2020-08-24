import { Response, Request } from "express";
import { v4 as uuid } from 'uuid';

import PersonValidator from "../services/validators/PersonValidator";
import EquipmentValidator from "../services/validators/EquipmentValidator";
import db from "../../config/database";
import Person from "../entities/Person";
import Equipment from "../entities/Equipment";
import InfectionReport from "../entities/InfectionReport";

class EquipmentController {
  async trade(req: Request, res: Response) {
    
  }
}

export default new EquipmentController();