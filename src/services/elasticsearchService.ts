import { elasticsearchClient } from '@/config/elasticsearchConfig';

export const searchBooks = async (query: string): Promise<any[]> => {
  try {
    const response = await elasticsearchClient.search({
      index: 'books',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['title^3'],
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
