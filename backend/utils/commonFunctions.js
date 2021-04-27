const convertDate = (str) => {
  str = str.toString();
  str = str.substring(4, 15);
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

  return parts[1] + '-' + months[parts[0]] + '-' + parts[2];
};

const generatePdfName = (test) => {
  return `${test.patient.name}_${test.patient.surname}_${convertDate(
    test.resultDate
  )}.pdf`;
};

const generatePrefixPhoneNumber = (phoneNumber) => {
  let prefixPhoneNumber = phoneNumber;

  prefixPhoneNumber.length === 10
    ? (prefixPhoneNumber = '+4' + prefixPhoneNumber)
    : (prefixPhoneNumber = prefixPhoneNumber);

  return prefixPhoneNumber;
};

export { convertDate, generatePdfName, generatePrefixPhoneNumber };
