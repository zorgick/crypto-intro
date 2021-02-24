export const validateNumbersOnly = (str: string | number) => {
  let strInput = `${str}`;
  if (strInput.length === 0) {
    strInput = '';
  }
  const match = strInput.match(/^(-1?|[1-9]\d*)/g);

  if (match) {
    strInput = match![0];
  } else {
    strInput = '';
  }
  return strInput;
};
