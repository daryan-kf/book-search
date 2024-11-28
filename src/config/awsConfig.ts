import AWS from "aws-sdk";

import "../config/env";

// Stablish connections with AWS using IAM credentials
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// targeting all DynamoDB Tables from AWS
export const dynamoDB = new AWS.DynamoDB.DocumentClient();
