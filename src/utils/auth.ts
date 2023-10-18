import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import nookies from 'nookies';

const generateToken = (user_id: string): string => {
  const payload = {
    user_id: user_id,
  };
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new JsonWebTokenError('No secret has be set');
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7 days',
  };
  return jwt.sign(payload, secret, options);
};

export const setToken = (res: NextApiResponse, user_id: string) => {
  nookies.set({ res }, 'token', generateToken(user_id), {
    httpOnly: true,
    path: '/',
  });
};
