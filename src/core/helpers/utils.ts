export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatPhone = phoneNumber => (phoneNumber
  ? phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')
  : '');

export const formatPhoneForPayload = phoneNumber => (phoneNumber
  ? phoneNumber.replace(/[\s\-.]/g, '')
  : '');

export const formatWordToPlural = (items, text) => (items.length > 1
  ? `${items.length} ${text}S`
  : `${items.length} ${text}`);
