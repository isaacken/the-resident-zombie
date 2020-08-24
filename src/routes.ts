import express from 'express';

import PersonController from './app/controllers/PersonController';
import EquipmentController from './app/controllers/EquipmentController';
import ReportController from './app/controllers/ReportController';

const routes = express.Router();

routes.post('/people', PersonController.store);
routes.patch('/people/location/:id', PersonController.updateLocation);
routes.patch('/people/flag-infected/:id', PersonController.updateInfected);

routes.post('/trade', EquipmentController.trade);

routes.get('/reports/infected-survivors', ReportController.infectedSurvivors);
routes.get('/reports/non-infected-survivors', ReportController.nonInfectedSurvivors);
routes.get('/reports/items-per-survivor', ReportController.itemsPerSurvivor);
routes.get('/reports/points-lost-by-infected-survivors', ReportController.pointsLostByInfectedSurvivors);

export default routes;