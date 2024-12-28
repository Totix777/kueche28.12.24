import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';
import { WEATHER } from '../config/constants';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const updateWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch weather'));
      } finally {
        setLoading(false);
      }
    };

    updateWeather();
    const interval = setInterval(updateWeather, WEATHER.UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
}