import express, { Request, Response } from 'express';
const router = express.Router();

// Define your routes
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the main route!');
});

export default router;
