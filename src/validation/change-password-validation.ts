import { body } from 'express-validator';

export const changePasswordValidation = [
  body('password').isLength({ min: 3 }),
  body('passwordAgain').isLength({ min: 3 }),
];
