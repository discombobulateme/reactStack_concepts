import { getRepository } from 'typeorm'; // as this repo has no specific rule, we can use this default
import { compare } from 'bcryptjs'; // import hash function from crypto library
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticationUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // I'm searching for a user in the repository that uses email as a search parameter
    const user = await usersRepository.findOne({ where: { email } });

    // because findOne method returns user or undefined
    // we don't need to compare, a simple: not(!) user is enough
    if (!user) {
      // for security purpose error doesnt'inform what actually is incorrect
      throw new AppError('Incorrect email/ password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/ password combination', 401);
    }

    // if pass through all those validations, I have an authenticated user
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // connects key to user
      expiresIn, // allow user to unlog! good for security
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticationUserService;
