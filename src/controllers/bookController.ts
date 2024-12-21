import { Request, Response } from 'express';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { dynamoDB } from '../config/awsConfig';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const data = await dynamoDB.send(
      new ScanCommand({ TableName: process.env.BOOKS_TABLE_NAME })
    );

    res.json(data.Items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
