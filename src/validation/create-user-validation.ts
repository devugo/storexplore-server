import { body } from 'express-validator';

export const createUserValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
];
