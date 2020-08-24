import express from 'express';

import PersonController from './app/controllers/PersonController';

const routes = express.Router();

routes.post('/people', PersonController.store);
routes.patch('/people/location/:id', PersonController.updateLocation);

export default routes;