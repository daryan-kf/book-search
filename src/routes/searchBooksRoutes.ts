import express from 'express';
import { searchBooksController } from '@/controllers/bookSearchController';

const router = express.Router();

router.get('/', searchBooksController);

export default router;
