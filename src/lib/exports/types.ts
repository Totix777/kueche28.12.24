export interface ExportOptions {
  startDate: Date;
  endDate: Date;
}

export type ExportType = 'tasks' | 'coolers' | 'food' | 'todos';

export interface ExportedTask {
  bereich: string;
  aufgabe: string;
  haeufigkeit: string;
  status: string;
  erledigtVon: string;
  erledigtAm: string;
}

export interface ExportedTodo {
  aufgabe: string;
  status: string;
  erledigtVon: string;
  erledigtAm: string;
  erstelltAm: string;
}