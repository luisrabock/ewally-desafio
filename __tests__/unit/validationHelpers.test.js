const validationHelper = require('../../src/helpers/validationHelpers');

describe('Validation Helper tests', () => {
  it('Receive a string and should return true if only contains numbers', async () => {
    const isANumber = validationHelper.stringHasOnlyNumbers('123');
    expect(isANumber).toBe(true);
  });

  it('Receive a string and should return false if not only contains numbers', async () => {
    const isANumber = validationHelper.stringHasOnlyNumbers('123A');
    expect(isANumber).toBe(false);
  });

  it('Receive a valid date and return true', async () => {
    const isValidDate = validationHelper.isDateValid(new Date());
    expect(isValidDate).toBe(true);
  });

  it('Receive a invalid date and return false', async () => {
    const isValidDate = validationHelper.isDateValid(new Date('2154-00-00'));
    expect(isValidDate).toBe(false);
  });

  it('Receive a even number and return two', async () => {
    const isEven = validationHelper.oneForOddTwoForEven(8);
    expect(isEven).toBe(2);
  });

  it('Receive a odd number and return one', async () => {
    const isEven = validationHelper.oneForOddTwoForEven(9);
    expect(isEven).toBe(1);
  });

  it('Receive a number less than nine and plus', async () => {
    const isSix = validationHelper.lessThanNinePlusMoreSendTwo(5);
    expect(isSix).toBe(6);
  });

  it('Receive a number greater than nine and return two', async () => {
    const isTwo = validationHelper.lessThanNinePlusMoreSendTwo(10);
    expect(isTwo).toBe(2);
  });
});