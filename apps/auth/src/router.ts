import express, { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { RequestValidationError } from './errors/request-validation-error';

const router = express.Router();

router.get('/currentuser', (req: Request, res: Response) => {
  res.json({ id: randomUUID(), name: 'Wojtas', age: 26 });
});

router.post('/signin', (_req: Request, _res: Response) => {
  void null;
});

router.post('/signout', (_req: Request, _res: Response) => {
  void null;
});

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log('Creating a user...');
    throw new DatabaseConnectionError();

    res.send({});
  }
);
export { router as authRouter };
