import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';

import { isValid, parseISO } from 'date-fns';
import { Book } from '../types';

import 'dotenv/config';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const parsePublishedDate = (date: string | undefined): string | boolean => {
  if (!date) return false;

  // Check if the date matches the required ISO format (YYYY-MM-DD)
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidFormat) return false;

  // Parse the date and validate it
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? date : false;
};

export const fetchBooks = async () => {
  const apiKey = 'AIzaSyDOYJj7Y3-CPtjwmsQg2GYqlkpvmRujy8Y';

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
      response.data.items.map((item: any) => {
        const volumeInfo = item.volumeInfo;

        if (
          volumeInfo.publisher &&
          volumeInfo.publisher !== 'Unknown' &&
          parsePublishedDate(volumeInfo.publishedDate)
        ) {
          books.push({
            id: item.id,
            title: volumeInfo.title,
            authors: volumeInfo.authors,
            description: volumeInfo.description,
            categories: volumeInfo.categories,
            thumbnail: volumeInfo.imageLinks?.thumbnail,
            publisher: volumeInfo.publisher,
            publishedDate: volumeInfo.publishedDate,
            pageCount: volumeInfo.pageCount,
          });
        }
      });
    }
  }

  return books;
};

(async () => {
  try {
    const books = await fetchBooks();

    // Resolve absolute path to books.json
    const filePath = path.join(__dirname, '../data/books.json');

    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write books to books.json file
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));

    console.log('Books successfully saved to books.json');
  } catch (error) {
    console.error('Error fetching books:', error);
  }
})();
