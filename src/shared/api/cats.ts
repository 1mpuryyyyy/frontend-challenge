import type { Cat } from '../types';

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_IMAGE_URL = 'https://api.thecatapi.com/v1/images';
const LIMIT = 10;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCats = async (page: number): Promise<Cat[]> => {
  const offset = page * LIMIT;
  const headers: Record<string, string> = {};
  if (API_KEY) {
    headers['x-api-key'] = API_KEY;
  }

  const response = await fetch(`${API_URL}?limit=${LIMIT}&offset=${offset}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Не получилось отправить запрос');
  }

  const data = await response.json();
  return data.map((cat: { id: string; url: string; width?: number; height?: number }) => ({
    id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
  }));
};

export const fetchCatById = async (id: string): Promise<Cat> => {
  const headers: Record<string, string> = {};
  if (API_KEY) {
    headers['x-api-key'] = API_KEY;
  }

  const response = await fetch(`${API_IMAGE_URL}/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Не получилось загрузить котика');
  }

  const cat = await response.json();
  return {
    id: cat.id,
    url: cat.url,
    width: cat.width,
    height: cat.height,
  };
};
