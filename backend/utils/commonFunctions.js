export function convertDate(str) {
  str = str.toString();
  let parts = str.split(' ');
  let months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  return parts[2] + '.' + months[parts[1]] + '.' + parts[3];
}
