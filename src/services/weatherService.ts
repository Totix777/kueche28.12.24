import { WeatherData, WeatherResponse } from '../types/weather';
import { WEATHER } from '../config/constants';
import { fetchFromAPI } from '../utils/api';

export async function fetchWeatherData(): Promise<WeatherData> {
  if (!WEATHER.API.KEY) {
    throw new Error('OpenWeather API key is not configured');
  }

  try {
    const data = await fetchFromAPI<WeatherResponse>('/weather', {
      q: `${WEATHER.CITY},${WEATHER.COUNTRY}`
    });
    
    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}