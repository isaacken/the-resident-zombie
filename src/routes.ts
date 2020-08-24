import express from 'express';

import PersonController from './app/controllers/PersonController';
import EquipmentController from './app/controllers/EquipmentController';

const routes = express.Router();

routes.post('/people', PersonController.store);
routes.patch('/people/location/:id', PersonController.updateLocation);
routes.patch('/people/flag-infected/:id', PersonController.updateInfected);

routes.post('/trade', EquipmentController.trade);

export default routes;