import { Request, Response } from 'express';
import createUSER from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUSER({
    name: 'Paloma', 
    email: 'p@p.com', 
    password:'123456',
    techs: [
      'Node.js',
      'React.js',
      'React Native',
      { title: 'Javascript', experience: 100 },
    ],
  });

  return response.json({ message: 'discombobulateme, bitte' });
}