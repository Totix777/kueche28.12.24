import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';
import { WeatherIcon } from './WeatherIcon';

export function WeatherDisplay() {
  const { weather, loading, error } = useWeather();

  if (loading) {
    return <div className="text-gray-500 dark:text-gray-400">Lädt Wetter...</div>;
  }

  if (error?.message.includes('API key')) {
    return (
      <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">OpenWeather API-Key fehlt</span>
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
      <WeatherIcon icon={weather.icon} />
      <div>
        <div className="font-medium dark:text-white">{weather.temp}°C</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {weather.description}
        </div>
      </div>
    </div>
  );
}