import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Cloudy } from 'lucide-react';

interface WeatherIconProps {
  icon: string;
}

export function WeatherIcon({ icon }: WeatherIconProps) {
  switch (icon.slice(0, 2)) {
    case '01': return <Sun className="w-6 h-6 text-yellow-500" />;
    case '02': return <Cloud className="w-6 h-6 text-gray-400" />;
    case '03':
    case '04': return <Cloudy className="w-6 h-6 text-gray-400" />;
    case '09':
    case '10': return <CloudRain className="w-6 h-6 text-blue-400" />;
    case '11': return <CloudLightning className="w-6 h-6 text-yellow-400" />;
    case '13': return <CloudSnow className="w-6 h-6 text-blue-200" />;
    default: return <Cloud className="w-6 h-6 text-gray-400" />;
  }
}