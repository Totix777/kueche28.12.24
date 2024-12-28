import React from 'react';
import { Book, CheckSquare, Thermometer, ShoppingCart, AlertTriangle } from 'lucide-react';

export function UserManual() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Book className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold dark:text-white">Benutzerhandbuch</h2>
      </div>

      <div className="space-y-8">
        {/* Aufgaben */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-green-600" />
            <span>Aufgaben</span>
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Aufgaben werden täglich um 00:00 Uhr automatisch zurückgesetzt</p>
            <p>• Erledigte Aufgaben bleiben bis 00:00 Uhr des nächsten Tages grün markiert</p>
            <p>• Aufgaben können nach Häufigkeit gefiltert werden (täglich, wöchentlich, monatlich)</p>
            <p>• Der Name des Mitarbeiters wird bei erledigten Aufgaben gespeichert</p>
          </div>
        </section>

        {/* Spülmaschine */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-red-600" />
            <span>Spülmaschine</span>
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Spülmaschine vor jedem Spülgang auf Sauberkeit prüfen</p>
            <p>• Siebe täglich reinigen und auf Beschädigungen kontrollieren</p>
            <p>• Spülarme auf freie Düsen und Leichtgängigkeit prüfen</p>
            <p>• Wasserstand und Reinigungsmittel vor dem Start kontrollieren</p>
            <p>• Geschirr vorsortieren und grobe Speisereste entfernen</p>
            <p>• Korrektes Programm entsprechend der Verschmutzung wählen</p>
            <p>• Nach Programmende Geschirr auskühlen lassen und einräumen</p>
          </div>
        </section>

        {/* Temperaturen */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-red-600" />
            <span>Temperaturkontrolle</span>
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Kühlhaus- und Speisetemperaturen müssen regelmäßig erfasst werden</p>
            <p>• Warnmeldungen erscheinen bei Über- oder Unterschreitung der Grenzwerte</p>
            <p>• Temperaturverläufe können in der Historie eingesehen werden</p>
            <p>• CSV-Export der Temperaturdaten ist über den Export-Button möglich</p>
          </div>
        </section>

        {/* Bestellungen */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <span>Bestellungen</span>
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Artikel können über die Suchfunktion gefunden werden</p>
            <p>• Bestellmengen können direkt eingegeben oder über +/- angepasst werden</p>
            <p>• Bestellhistorie zeigt alle vergangenen Bestellungen</p>
            <p>• Status der Bestellungen kann aktualisiert werden</p>
          </div>
        </section>

        {/* HACCP */}
        <section>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>HACCP</span>
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Kritische Kontrollpunkte (CCP) müssen dokumentiert werden</p>
            <p>• Dokumente können als PDF hochgeladen werden</p>
            <p>• Audit-Ergebnisse werden im System erfasst</p>
            <p>• Automatische E-Mail-Benachrichtigungen bei Grenzwertüberschreitungen</p>
          </div>
        </section>

        {/* Export */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Export</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>• Alle Daten können als CSV-Datei exportiert werden</p>
            <p>• Zeitraum für den Export kann frei gewählt werden</p>
            <p>• Separate Exports für Aufgaben, Temperaturen und HACCP-Daten</p>
            <p>• Exportierte Dateien werden automatisch heruntergeladen</p>
          </div>
        </section>
      </div>
    </div>
  );
}