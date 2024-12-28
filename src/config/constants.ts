export const WEATHER = {
  CITY: 'Ludwigshafen',
  COUNTRY: 'DE',
  UPDATE_INTERVAL: 30 * 60 * 1000, // 30 minutes
  API: {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    KEY: import.meta.env.VITE_OPENWEATHER_API_KEY
  }
} as const;