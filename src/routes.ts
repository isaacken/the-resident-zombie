import express from 'express';

import PersonController from './app/controllers/PersonController';

const routes = express.Router();

routes.post('/people', PersonController.store);

export default routes;