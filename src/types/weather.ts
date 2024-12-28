export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

export interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}