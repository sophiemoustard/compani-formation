import { DateTime, Settings, DurationObjectUnits } from 'luxon';

Settings.defaultLocale = 'fr';

export class CompaniDate {
  date: DateTime;

  constructor(...args: any[]) {
    if (!args.length) {
      this.date = DateTime.now();
    } else if (args.length === 1 && args[0] instanceof CompaniDate) {
      this.date = args[0]._getDate();
    } else if (args.length === 1 && args[0] instanceof DateTime) {
      this.date = args[0];
    } else if (args.length === 1 && args[0] instanceof Date) {
      this.date = DateTime.fromJSDate(args[0]);
    } else if (args.length === 1 && typeof args[0] === 'string') {
      this.date = DateTime.fromISO(args[0]);
    } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
      this.date = DateTime.fromFormat(args[0], args[1]);
    } else {
      this.date = DateTime.fromISO('invalid date');
    }
  }

  _getDate() {
    return this.date;
  }

  isValid() {
    return this.date.isValid;
  }

  toString() {
    return this.date.toString() || '';
  }

  toISOString() {
    return this.date.toUTC().toISO() || '';
  }

  format(fmt: string) {
    return this.date.toFormat(fmt) || '';
  }

  isSameOrBefore(otherDate : Date | CompaniDate | string) {
    const instancedOtherDate = new CompaniDate(otherDate);

    return this.date <= instancedOtherDate._getDate() || false;
  }

  isBefore(otherDate : Date | CompaniDate | string) {
    const instancedOtherDate = new CompaniDate(otherDate);

    return this.date < instancedOtherDate._getDate() || false;
  }

  diff(otherDate : Date | CompaniDate, unit: keyof DurationObjectUnits, typeFloat = false) {
    const instancedOtherDate = new CompaniDate(otherDate);
    const floatDiff = this.date.diff(instancedOtherDate._getDate(), unit).as(unit);
    const roundedDiff = floatDiff > 0 ? Math.floor(floatDiff) : Math.ceil(floatDiff);

    return typeFloat ? floatDiff : roundedDiff;
  }

  endOf(unit: keyof DurationObjectUnits) {
    const res = this.date.endOf(unit);

    return new CompaniDate(res);
  }

  add(amount: number, unit: string) {
    const res = this.date.plus({ [unit]: amount });

    return new CompaniDate(res);
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
