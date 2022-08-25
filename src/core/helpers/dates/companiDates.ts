import pick from 'lodash/pick';
import { DateTime, DateTimeUnit, DurationObjectUnits } from './luxon';

type DateTypes = Date | CompaniDateType | string;

type ObjectDateType = {
  [key in DateTimeUnit]?: number
};

type CompaniDateType = {
  _getDate: DateTime,
  getUnits: (units: DateTimeUnit[]) => ObjectDateType,
  format: (str: string) => string,
  toDate: () => Date,
  toISO: () => string,
  isSame: (miscTypeOtherDate: DateTypes, unit : DateTimeUnit) => boolean,
  isBefore: (date: DateTypes) => boolean,
  isAfter: (date: DateTypes) => boolean,
  isSameOrBefore: (date: DateTypes) => boolean,
  startOf: (unit: DateTimeUnit) => CompaniDateType,
  endOf: (unit: DateTimeUnit) => CompaniDateType,
  diff: (date: DateTypes, unit: keyof DurationObjectUnits, typeFloat?: boolean) => number,
  add: (amount: number, unit: keyof DurationObjectUnits) => CompaniDateType,
  set: (values: ObjectDateType) => CompaniDateType,
}

const CompaniDateFactory = (inputDate: DateTime): CompaniDateType => {
  const _date = inputDate;

  return ({
    // GETTER
    get _getDate() {
      return _date;
    },

    getUnits(units: DateTimeUnit[]) {
      return pick(_date.toObject(), units);
    },

    // DISPLAY
    format(fmt: string) {
      return _date.toFormat(fmt);
    },

    toDate() {
      return _date.toUTC().toJSDate();
    },

    toISO() {
      return _date.toUTC().toISO();
    },

    // QUERY

    isSame(miscTypeOtherDate: DateTypes, unit : DateTimeUnit = 'millisecond') {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date.hasSame(otherDate, unit);
    },

    isBefore(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date < otherDate;
    },

    isAfter(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date > otherDate;
    },

    isSameOrBefore(miscTypeOtherDate : DateTypes) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);

      return _date <= otherDate;
    },

    // MANIPULATE
    startOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.startOf(unit));
    },

    endOf(unit: DateTimeUnit) {
      return CompaniDateFactory(_date.endOf(unit));
    },

    diff(miscTypeOtherDate : DateTypes, unit: keyof DurationObjectUnits, typeFloat = false) {
      const otherDate = _formatMiscToCompaniDate(miscTypeOtherDate);
      const floatedDiff = _date.diff(otherDate, unit).as(unit);
      const roundedDiff = floatedDiff > 0 ? Math.floor(floatedDiff) : Math.ceil(floatedDiff);

      return typeFloat ? floatedDiff : roundedDiff;
    },

    add(amount: number, unit: keyof DurationObjectUnits) {
      return CompaniDateFactory(_date.plus({ [unit]: amount }));
    },

    set(values: ObjectDateType) {
      return CompaniDateFactory(_date.set(values));
    },
  });
};

const _formatMiscToCompaniDate = (...args: DateTypes[]) => {
  if (!args.length) return DateTime.now();

  if (args.length === 1) {
    if (args[0] instanceof Date) return DateTime.fromJSDate(args[0]);
    if (args[0] instanceof Object && args[0]?._getDate instanceof DateTime) return args[0]._getDate;
    if (typeof args[0] === 'string' && args[0] !== '') return DateTime.fromISO(args[0]);
  }

  if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
    const options = args[0].endsWith('Z') ? { zone: 'utc' } : {};
    return DateTime.fromFormat(args[0], args[1], options);
  }

  return DateTime.invalid('wrong arguments');
};

export default (...args: DateTypes[]): CompaniDateType => CompaniDateFactory(_formatMiscToCompaniDate(...args));
