import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

// needed because my verify token needs to know its format
interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // JWT token validation logic

  // first thing is to get Token from Header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  /*
  Bearer token: as it is 2 different informations, need to split
  deconstruct needs those 2, but as I'm not using the first, Bearer
  just leave the "," and JS will understand that I don't wanna use it
  */
  const [, token] = authHeader.split(' ');

  try {
    // verify function returns token decodifyed as an object + secret key from service
    const decoded = verify(token, authConfig.jwt.secret);

    // decoded as TokenPayload is forcing it to use this format, TS hacks ;)
    const { sub } = decoded as TokenPayload;

    // this makes my route available in all other files
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
