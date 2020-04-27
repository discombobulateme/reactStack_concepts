import { Router } from 'express';

import AuthenticationUserService from '../services/AuthenticateUserSerice';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticationUserService();

  /*
  we never get the response of a service and send it to return,
  specifically when it's a generic name, that I cannot understand what its returning
  I need to know what am I receiving from service and sending to frontend
  that's why my const is {user} and not something like: response
  */
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
