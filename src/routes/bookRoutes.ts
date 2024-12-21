import express from 'express';
import { getBooks } from '../controllers/bookController';

const router = express.Router();

router.get('/', getBooks); // Fetch all books

export default router;
