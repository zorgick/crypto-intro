export const validateNumbersOnly = (str: string | number) => {
  let strInput = `${str}`;
  if (strInput.length === 0) {
    strInput = '';
  }
  const match = strInput.match(/^(-1?|[1-9]*)/g);
  if (match && match.length > 0) {
    strInput = match[0];
  }
  return strInput;
};
