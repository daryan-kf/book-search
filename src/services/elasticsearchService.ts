import { elasticsearchClient } from '@/config/elasticsearchConfig';

export const searchBooks = async (query: string): Promise<any[]> => {
  try {
    const response = await elasticsearchClient.search({
      index: 'books', // Your Elasticsearch index name
      body: {
        query: {
          multi_match: {
            query,
            fields: ['title^3'], // Adjust fields and weights as per your data
          },
        },
      },
    });

    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error('Error performing Elasticsearch search:', error);
    throw new Error('Search failed');
  }
};
