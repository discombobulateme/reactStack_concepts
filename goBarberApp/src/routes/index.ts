import { Router } from 'express';
import appointmetnsRouter from './appointments.routes';

const routes = Router();

// use allows me to not repeat the path when creating a route in other fiels
routes.use('/appointments', appointmetnsRouter);

export default routes;
