exports.capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

exports.truncate = (text, limit) => text.length > limit ? `${text.slice(0, limit - 2)}...` : text;
