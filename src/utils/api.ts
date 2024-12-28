import { WEATHER } from '../config/constants';

export async function fetchFromAPI<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const queryString = new URLSearchParams({
    ...params,
    appid: WEATHER.API.KEY,
    units: 'metric',
    lang: 'de'
  }).toString();

  const response = await fetch(`${WEATHER.API.BASE_URL}${endpoint}?${queryString}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}