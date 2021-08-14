import { body } from 'express-validator';

export const activateSaleManagerValidation = [body('active').isBoolean()];
