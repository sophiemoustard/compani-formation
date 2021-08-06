import { DateTime, Settings } from 'luxon';

Settings.defaultLocale = 'fr';

export class CompaniDate {
  date: DateTime | null;

  constructor(...args: any[]) {
    if (!args.length) {
      this.date = DateTime.now();
    } else {
      this.date = null;
    }
  }

  toString() {
    return this.date?.toString();
  }
}

export const companiDate = (...args: any[]) => new CompaniDate(...args);

export const isBetween = (date: Date, min: Date, max: Date): boolean => new Date(date) < new Date(max) &&
  new Date(date) > new Date(min);

export const getStartOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getEndOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

export const ascendingSort = (date1: Date, date2: Date): number => {
  if (isBefore(date1, date2)) return 1;
  if (isAfter(date1, date2)) return -1;
  return 0;
};

export const descendingSort = (date1: Date, date2: Date): number => {
  if (isAfter(date1, date2)) return 1;
  if (isBefore(date1, date2)) return -1;
  return 0;
};

export const isBefore = (date1: Date, date2: Date): boolean => new Date(date1) < new Date(date2);

export const isSameOrBefore = (date1: Date, date2: Date): boolean => new Date(date1) <= new Date(date2);

export const isAfter = (date1: Date, date2: Date): boolean => new Date(date1) > new Date(date2);

export const isSameOrAfter = (date1: Date, date2: Date): boolean => new Date(date1) >= new Date(date2);
