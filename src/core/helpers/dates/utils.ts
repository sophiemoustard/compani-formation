// @ts-nocheck

import CompaniDate from './companiDates';

const START_DATE_KEY = 'startDate';
const END_DATE_KEY = 'endDate';

type KeyDateType = typeof START_DATE_KEY | typeof END_DATE_KEY;

export const ascendingSort = (key: KeyDateType) => (a, b) => (CompaniDate(a[key]).isAfter(b[key]) ? 1 : -1);

export const descendingSort = (key: KeyDateType) => (a, b) => (CompaniDate(a[key]).isBefore(b[key]) ? 1 : -1);
