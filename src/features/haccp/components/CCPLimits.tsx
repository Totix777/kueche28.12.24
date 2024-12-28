import React from 'react';
import { AlertTriangle } from 'lucide-react';

const CCP_LIMITS = {
  TEMPERATURE: {
    STORAGE: {
      CRITICAL: { MIN: 2, MAX: 8 },
      WARNING: { MIN: 3, MAX: 7 }
    },
    COOKING: {
      CRITICAL: { MIN: 75 },
      WARNING: { MIN: 72 }
    },
    HOT_HOLDING: {
      CRITICAL: { MIN: 65 },
      WARNING: { MIN: 68 }
    },
    COOLING: {
      CRITICAL: { MAX: 5, TIME: 90 }, // 90 minutes
      WARNING: { MAX: 7, TIME: 75 } // 75 minutes
    }
  }
} as const;

export function CCPLimits() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-bold dark:text-white">Kritische Kontrollpunkte (CCP)</h2>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-3 dark:text-white">Lagertemperaturen</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Kritischer Bereich:</span>
              <span className="font-medium text-red-600">
                {CCP_LIMITS.TEMPERATURE.STORAGE.CRITICAL.MIN}°C - {CCP_LIMITS.TEMPERATURE.STORAGE.CRITICAL.MAX}°C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Warnbereich:</span>
              <span className="font-medium text-amber-600">
                {CCP_LIMITS.TEMPERATURE.STORAGE.WARNING.MIN}°C - {CCP_LIMITS.TEMPERATURE.STORAGE.WARNING.MAX}°C
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-3 dark:text-white">Gartemperaturen</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Kritische Mindesttemperatur:</span>
              <span className="font-medium text-red-600">
                {CCP_LIMITS.TEMPERATURE.COOKING.CRITICAL.MIN}°C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Warntemperatur:</span>
              <span className="font-medium text-amber-600">
                {CCP_LIMITS.TEMPERATURE.COOKING.WARNING.MIN}°C
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-3 dark:text-white">Warmhalten</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Kritische Mindesttemperatur:</span>
              <span className="font-medium text-red-600">
                {CCP_LIMITS.TEMPERATURE.HOT_HOLDING.CRITICAL.MIN}°C
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-3 dark:text-white">Abkühlung</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Kritische Zeit:</span>
              <span className="font-medium text-red-600">
                {CCP_LIMITS.TEMPERATURE.COOLING.CRITICAL.TIME} Minuten bis {CCP_LIMITS.TEMPERATURE.COOLING.CRITICAL.MAX}°C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Warnzeit:</span>
              <span className="font-medium text-amber-600">
                {CCP_LIMITS.TEMPERATURE.COOLING.WARNING.TIME} Minuten bis {CCP_LIMITS.TEMPERATURE.COOLING.WARNING.MAX}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}