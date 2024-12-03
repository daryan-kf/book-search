import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDB } from '@/config/awsConfig';

describe('DynamoDB Data Insertion', () => {
  it('should fetch books from DynamoDB to confirm insertion', async () => {
    const params = {
      TableName: 'books',
      Limit: 5, // Limit for testing
    };

    const result = await dynamoDB.send(new ScanCommand(params));
    expect(result.Items).toBeDefined();
    expect(result.Items!.length).toBeGreaterThan(0);
  });
});
