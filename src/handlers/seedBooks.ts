import fs from 'fs';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { dynamoDB } from '@/config/awsConfig';
import { Book } from '@/types/index';

const booksData: Book[] = JSON.parse(
  fs.readFileSync('src/data/books.json', 'utf8')
);

const insertBooks = async () => {
  // table name in DynamoDB
  const tableName = 'books';

  try {
    for (const book of booksData) {
      const params: { TableName: string; Item: Book } = {
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
