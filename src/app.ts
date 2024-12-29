import express from 'express';
import dotenv from 'dotenv';
import { bookRoutes, homeRoute, searchBooksRoutes } from './routes';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/', homeRoute);
app.use('/books', bookRoutes);
app.use('/books/search', searchBooksRoutes);

export default app;
