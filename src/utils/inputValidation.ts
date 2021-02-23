export const validateNumbersOnly = (str: string | number) => {
  let strInput = `${str}`;
  if (strInput.length === 0) {
    strInput = '';
  }
  const match = strInput.match(/^(?:-1|\d*)/g);
  if (match?.length) {
    strInput = match[0];
  }
  return strInput;
};
