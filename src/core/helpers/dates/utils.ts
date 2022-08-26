import CompaniDate from './companiDates';

export const ascendingSort = key => (a, b) => (CompaniDate(a[key]).isAfter(b[key]) ? 1 : -1);

export const descendingSort = key => (a, b) => (CompaniDate(a[key]).isBefore(b[key]) ? 1 : -1);
