import { Client } from '@elastic/elasticsearch';

export const elasticsearchClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
});
