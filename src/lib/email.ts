import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = 'service_t9atbc5';
const EMAIL_TEMPLATE_ID = 'template_pq0lsc2';
const PUBLIC_KEY = 'RsebYPrOW0W5xX_4Z';

interface EmailParams {
  content: string;
  [key: string]: string;
}

export async function sendEmail(params: EmailParams) {
  try {
    await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      params,
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendOrderNotification(orderItems: string[], submittedBy: string) {
  const header = 'Art.-Nr.\tArtikelbezeichnung\tVE\tBestell-Einheit\tMenge';
  const formattedItems = orderItems.map(item => {
    const [articleNumber, name, packageSize, orderUnit, quantity] = item.split(',');
    return `${articleNumber}\t${name}\t${packageSize}\t${orderUnit}\t${quantity}`;
  });

  const content = `Eine neue Bestellung wurde von ${submittedBy} aufgegeben:\n\n${header}\n${formattedItems.join('\n')}`;
  return sendEmail({ content });
}

export async function sendHACCPNotification(type: string, details: string) {
  const content = `
HACCP Benachrichtigung

Typ: ${type}
Details: ${details}

Dies ist eine automatisch generierte Nachricht vom HACCP-Managementsystem.
  `.trim();

  return sendEmail({ content });
}

export async function sendHACCPReport(
  type: 'CCP' | 'Audit' | 'Dokument',
  data: Record<string, any>
) {
  let content = `HACCP ${type} Bericht\n\n`;

  switch (type) {
    case 'CCP':
      content += `
Kontrollpunkt: ${data.location}
Messwert: ${data.value}°C
Grenzwert: ${data.limit}°C
Geprüft von: ${data.checkedBy}
Datum: ${new Date().toLocaleString('de-DE')}
${data.notes ? `\nAnmerkungen: ${data.notes}` : ''}
      `.trim();
      break;

    case 'Audit':
      content += `
Audit-Typ: ${data.type === 'internal' ? 'Intern' : 'Extern'}
Auditor: ${data.auditor}
Datum: ${data.date.toLocaleString('de-DE')}
Status: ${data.status === 'open' ? 'Offen' : 'Abgeschlossen'}

Feststellungen:
${data.findings.map((f: any) => `
- Kategorie: ${f.category === 'critical' ? 'Kritisch' : f.category === 'major' ? 'Schwerwiegend' : 'Geringfügig'}
  Beschreibung: ${f.description}
  Korrekturmaßnahme: ${f.correctionAction}
  Frist: ${f.deadline.toLocaleString('de-DE')}
  Status: ${f.status === 'open' ? 'Offen' : f.status === 'in-progress' ? 'In Bearbeitung' : 'Abgeschlossen'}
`).join('\n')}
      `.trim();
      break;

    case 'Dokument':
      content += `
Titel: ${data.title}
Version: ${data.version}
Erstellt am: ${new Date().toLocaleString('de-DE')}
Genehmigt von: ${data.approvedBy || 'Nicht genehmigt'}
      `.trim();
      break;
  }

  return sendEmail({ content });
}

export async function sendHACCPTestEmail() {
  const testContent = `
HACCP Test-Benachrichtigung

Kritische Kontrollpunkte (CCP):

1. Temperaturüberwachung
   - Kühlhaus: 4°C (im Normbereich)
   - Tiefkühler: -20°C (im Normbereich)
   - Warmhaltetemperatur: 68°C (im Normbereich)

2. Dokumentation
   - Tägliche Temperaturkontrollen durchgeführt
   - Reinigungspläne aktualisiert
   - Personalschulungen dokumentiert

3. Hygienemaßnahmen
   - Reinigungspläne eingehalten
   - Schädlingsmonitoring durchgeführt
   - Personalhygiene überprüft

Dies ist eine Test-E-Mail vom HACCP-Managementsystem.
  `.trim();

  return sendEmail({ content: testContent });
}