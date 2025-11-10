import axios from 'axios';

// Using CryptoCompare API for news (free tier)
const CRYPTOCOMPARE_API = 'https://min-api.cryptocompare.com/data/v2/news/';

export interface CryptoNews {
  id: string;
  guid: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  source: string;
  body: string;
  tags: string;
  categories: string;
  upvotes?: string;
  downvotes?: string;
  lang?: string;
  source_info?: {
    name: string;
    img?: string;
  };
}

export interface NewsResponse {
  Data: CryptoNews[];
  Type: number;
  Message?: string;
}

export const getCryptoNews = async (limit: number = 10): Promise<CryptoNews[]> => {
  try {
    const response = await axios.get<NewsResponse>(CRYPTOCOMPARE_API, {
      params: {
        lang: 'EN',
        sortOrder: 'latest',
      },
    });
    
    // Return limited results
    return response.data.Data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    // Fallback: return empty array or mock data
    return [];
  }
};

