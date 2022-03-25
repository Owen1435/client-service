import { EXPIRES_IN, SECRET_KEY } from './jwt.constant';

export const jwtConfig = {
  secret: SECRET_KEY,
  signOptions: {
    expiresIn: EXPIRES_IN,
  },
};
