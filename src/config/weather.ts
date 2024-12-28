export const WEATHER_CONFIG = {
  API: {
    KEY: import.meta.env.VITE_OPENWEATHER_API_KEY,
    BASE_URL: 'https://api.openweathermap.org/data/2.5'
  },
  CITY: 'Ludwigshafen',
  COUNTRY: 'DE',
  UPDATE_INTERVAL: 30 * 60 * 1000 // 30 minutes
} as const;