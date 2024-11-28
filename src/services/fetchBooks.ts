import axios from 'axios';
import fs from 'fs/promises';

import '../config/env';

import { Book } from '@/types';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async () => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Google API key is not defined in the environment variables.'
    );
  }

  const categories = ['Fiction', 'Science', 'History', 'Fantasy', 'Romance'];
  const books: Book[] = [];

  for (const category of categories) {
    const response = await axios.get(GOOGLE_BOOKS_API_URL, {
      params: {
        q: `subject:${category}`,
        maxResults: 40,
        key: apiKey,
      },
    });

    if (response.data.items) {
      books.push(
        ...response.data.items.map((item: any) => {
          const volumeInfo = item.volumeInfo;
          return {
            id: item.id,
            title: volumeInfo.title,
            authors: volumeInfo.authors || [],
            description: volumeInfo.description || 'No description available.',
            categories: volumeInfo.categories || [],
            thumbnail: volumeInfo.imageLinks?.thumbnail || '',
            publisher: volumeInfo.publisher || 'Unknown',
            publishedDate: volumeInfo.publishedDate || 'Unknown',
            pageCount: volumeInfo.pageCount || 0,
          };
        })
      );
    }
  }

  return books;
};

(async () => {
  try {
    const books = await fetchBooks(); // Replace fetchBooks with your actual function to fetch books.

    // Write books to a JSON file
    await fs.writeFile('src/data/books.json', JSON.stringify(books, null, 2));

    console.log('Books successfully saved to books.json');
  } catch (error) {
    console.error('Error fetching books:', error);
  }
})();
