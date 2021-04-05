module.exports = {
  stringHasOnlyNumbers(str) {
    return !/\D/.test(str);
  },
  isDateValid(date) {
    if (Number.isNaN(date.getTime())) {
      return false;
    } return true;
  },
  fullDateFromPayNumberConcessionaria(payNumber) {
    const year = payNumber.substr(26, 4);
    const month = payNumber.substr(30, 2);
    const day = payNumber.substr(32, 2);
    const fullDate = new Date(`${year}-${month}-${day}`);
    return fullDate;
  },
  oneForOddTwoForEven(number) {
    return (number % 2 ? 1 : 2);
  },
  lessThanNinePlusMoreSendTwo(number) {
    let multiplier = number;
    if (multiplier < 9) {
      multiplier += 1;
      return multiplier;
    }
    return 2;
  },
};
