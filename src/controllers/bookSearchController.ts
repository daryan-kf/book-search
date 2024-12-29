import { Request, Response, NextFunction } from 'express';
import { searchBooks } from '@/services/elasticsearchService';

export const searchBooksController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  try {
    const results = await searchBooks(query as string);
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};
