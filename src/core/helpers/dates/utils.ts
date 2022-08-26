import CompaniDate from './companiDates';

export const ascendingSort = key => (a, b) => CompaniDate(a[key]).diff(b[key], 'milliseconds');

export const descendingSort = key => (a, b) => CompaniDate(b[key]).diff(a[key], 'milliseconds');
