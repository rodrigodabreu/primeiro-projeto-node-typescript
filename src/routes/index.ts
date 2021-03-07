import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // serve para direcionar todo e qualquer requisição que vier de appointments para appointments.routes

export default routes;
