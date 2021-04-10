export const convertDate = (str) => {
  str = str.toString();
  str = str.substring(0, 10);
  let parts = str.split('-');

  return parts[2] + '-' + parts[1] + '-' + parts[0];
};
