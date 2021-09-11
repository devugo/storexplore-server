import { body } from 'express-validator';

export const updateSaleManagerValidation = [
  body('firstname').isString().isLength({ min: 2 }),
  body('lastname').isString().isLength({ min: 2 }),
  body('dob').isDate(),
];
