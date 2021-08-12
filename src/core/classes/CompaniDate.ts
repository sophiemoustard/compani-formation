import { DateTime, DurationObjectUnits } from 'luxon';

export default class CompaniDate {
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
