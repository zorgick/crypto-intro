export const truncate = (str: string, length: number, separator = '...') => {
  if (!str) {
    return '';
  } if (str.length <= length) {
    return str;
  }

  const pad = Math.round(length - separator.length) / 2;
  const start = str.substr(0, pad);
  const end = str.substr(str.length - pad);

  return [start, separator, end].join('');
};
