import fs from 'fs';
import path from 'path';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { Book } from '@/types/index';

import { dynamoDB } from '../config/awsConfig';

const booksData: Book[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/books.json'), 'utf8')
);

const insertBooks = async () => {
  const tableName = 'books';

  try {
    for (const book of booksData) {
      const params = {
        TableName: tableName,
        Item: {
          id: book.id,
          title: book.title,
          authors: book.authors,
          description: book.description,
          categories: book.categories,
          thumbnail: book.thumbnail,
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          pageCount: book.pageCount,
        },
      };

      await dynamoDB.send(new PutCommand(params));
      console.log(`Inserted book: ${book.title}`);
    }

    console.log('Books successfully inserted into DynamoDB.');
  } catch (e) {
    console.error('Error inserting books into DynamoDB:', e);
  }
};

insertBooks();
