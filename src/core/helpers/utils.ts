import moment from './moment';

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalizeDate = date => capitalize(`${moment(date).format('dddd Do')
} ${capitalize(moment(date).format('MMMM YYYY'))}`);
