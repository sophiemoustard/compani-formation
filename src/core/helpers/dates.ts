import { Settings, DateTime, DurationObjectUnits } from 'luxon';
import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/fr';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/fr';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/fr';

Settings.defaultLocale = 'fr';

type CompaniDate = {
  _date: DateTime;
}

const companiDate = (...args: any[]) => {
  const instancedDateTime = instantiateDateTimeFromMisc(...args);

  return companiDateFactory(instancedDateTime);
};

const companiDateFactory = (_date: DateTime) => ({
  _date,

  _getDate() {
    return this._date;
  },
  isValid() {
    return this._date.isValid;
  },
  toString() {
    return this._date.toString() || '';
  },
  toISOString() {
    return this._date.toUTC().toISO() || '';
  },
  format(fmt: string) {
    return this._date.toFormat(fmt) || '';
  },
  isSameOrBefore(miscTypeOtherDate : Date | CompaniDate | string) {
    const otherDate = instantiateDateTimeFromMisc(miscTypeOtherDate);

    return this._date <= otherDate || false;
  },
  isBefore(miscTypeOtherDate : Date | CompaniDate | string) {
    const otherDate = instantiateDateTimeFromMisc(miscTypeOtherDate);

    return this._date < otherDate || false;
  },
  diff(miscTypeOtherDate : Date | CompaniDate, unit: keyof DurationObjectUnits, typeFloat = false) {
    const otherDate = instantiateDateTimeFromMisc(miscTypeOtherDate);
    const floatDiff = this._date.diff(otherDate, unit).as(unit);
    const roundedDiff = floatDiff > 0 ? Math.floor(floatDiff) : Math.ceil(floatDiff);

    return typeFloat ? floatDiff : roundedDiff;
  },
  endOf(unit: keyof DurationObjectUnits) {
    const res = this._date.endOf(unit);

    return companiDateFactory(res);
  },
  add(amount: number, unit: string) {
    const res = this._date.plus({ [unit]: amount });

    return companiDateFactory(res);
  },
});

const instantiateDateTimeFromMisc = (...args: any[]) => {
  if (!args.length) {
    return DateTime.now();
  } if (args.length === 1 && args[0] instanceof Object && !!args[0]._date && args[0]._date instanceof DateTime) {
    return args[0]._getDate();
  } if (args.length === 1 && args[0] instanceof DateTime) {
    return args[0];
  } if (args.length === 1 && args[0] instanceof Date) {
    return DateTime.fromJSDate(args[0]);
  } if (args.length === 1 && typeof args[0] === 'string') {
    return DateTime.fromISO(args[0]);
  } if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    return DateTime.fromFormat(args[0], args[1]);
  }
  return DateTime.invalid('wrong arguments');
};

export default companiDate;
