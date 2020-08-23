import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.sendStatus(200);
});

export default routes;