import express from 'express';
import dotenv from 'dotenv';

import { bookRoutes, homeRoute } from './routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);

app.use('/', homeRoute);

export default app;
