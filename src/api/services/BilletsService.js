const createError = require('http-errors');
const { format, addDays } = require('date-fns');
const validationHelper = require('../../helpers/validationHelpers');
const typeBilletsConstants = require('../../constants/typeBilletsConstants');
const dateConstants = require('../../constants/dateConstants');

 const findtypeBillet = (PayNumberLength) => {
  if (PayNumberLength === 47) return typeBilletsConstants.tituloBancario;
  if (PayNumberLength === 48) return typeBilletsConstants.pagamentoConcessionaria;

  throw createError(400, 'Linha digitável está inválida. Ela deve ser formada por 47 ou 48 dígitos.');
};

const makeBilletFields = (payNumber, typeBillet) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    const fieldA = payNumber.substr(0, 9);
    const fieldB = payNumber.substr(10, 10);
    const fieldC = payNumber.substr(21, 10);
    const fieldE = payNumber.substr(33);
    return {
      fieldA, fieldB, fieldC, fieldE,
    };
  }
  const fieldA = payNumber.substr(0, 11);
  const fieldB = payNumber.substr(12, 11);
  const fieldC = payNumber.substr(24, 11);
  const fieldD = payNumber.substr(36, 11);
  return {
    fieldA, fieldB, fieldC, fieldD,
  };
};

const makeVerifyCodes = (payNumber, typeBillet) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    const verifyCodeA = parseInt(payNumber.substr(9, 1), 10);
    const verifyCodeB = parseInt(payNumber.substr(20, 1), 10);
    const verifyCodeC = parseInt(payNumber.substr(31, 1), 10);
    const fullVerifyCode = parseInt(payNumber.substr(32, 1), 10);
    return {
      verifyCodeA, verifyCodeB, verifyCodeC, fullVerifyCode,
    };
  }
  const verifyCodeA = parseInt(payNumber.substr(11, 1), 10);
  const verifyCodeB = parseInt(payNumber.substr(23, 1), 10);
  const verifyCodeC = parseInt(payNumber.substr(35, 1), 10);
  const verifyCodeD = parseInt(payNumber.substr(47, 1), 10);
  const fullVerifyCode = parseInt(payNumber.substr(3, 1), 10);
  return {
    verifyCodeA, verifyCodeB, verifyCodeC, verifyCodeD, fullVerifyCode,
  };
};

const makeBarCode = (fields, typeBillet, verifyCodes) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    const barCode = `${fields.fieldA.substr(0, 4)}${verifyCodes.fullVerifyCode}${fields.fieldE}${fields.fieldA.slice(4)}${fields.fieldB}${fields.fieldC}`;
    return barCode;
  }
  const barCode = `${fields.fieldA}${fields.fieldB}${fields.fieldC}${fields.fieldD}`;
  return barCode;
};

const normalizePayloadBillet = (barCode, amountCash, expirationDate) => {
  const normalizedBilet = {
    ...barCode && { barCode },
    ...amountCash && { amount: amountCash },
    ...expirationDate && { expirationDate },
  };
  return normalizedBilet;
};

const findFactor = (payNumber) => payNumber.substr(33, 4);

const deleteFullVerifyCodeOnBarCode = (barCode, typeBillet) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    return barCode.slice(0, 4) + barCode.slice(5);
  }
  return barCode.slice(0, 3) + barCode.slice(4);
};

const findExpirationDate = (payNumber, typeBillet) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    const factor = parseInt(findFactor(payNumber), 10);
    const formattedDate = format(addDays(dateConstants.baseDate, factor + 1), 'yyyy-MM-dd');
    return formattedDate;
  }
  const fullDate = validationHelper.fullDateFromPayNumberConcessionaria(payNumber);
  if (validationHelper.isDateValid(fullDate)) {
    return fullDate;
  }
  return null;
};

const findCoinCode = (barcode) => barcode.charAt(2);

const findAmountinCashInNumber = (barCode, typeBillet) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    const stringAmountCash = `${barCode.substr(9, 8)}.${barCode.substr(17, 2)}`;
    const floatAmountCash = parseFloat(stringAmountCash, 10);
    if (floatAmountCash === 0) return null;
    return floatAmountCash.toFixed(2);
  }
  const stringAmount = `${barCode.substr(4, 9)}.${barCode.substr(13, 2)}`;
  const floatAmountCash = parseFloat(stringAmount, 10);
  if (floatAmountCash === 0) return null;
  return floatAmountCash.toFixed(2);
};

const calculationModule10 = (fieldOrBarCode) => {
  const transformArrayAndReverse = fieldOrBarCode.split('').reverse();
  const sum = transformArrayAndReverse.reduce((acc, curr, index) => {
    let result = curr * validationHelper.oneForOddTwoForEven(index);
    // noves fora
    if (result > 9) {
      result -= 9;
    }
    return acc + result;
  }, 0);
  if (sum % 10) {
    return 10 - (sum % 10);
  }

  return 0;
};

const calculationModule11 = (barCode, typeBillet) => {
  const transformArrayAndReverse = barCode.split('').reverse();
  let multiplier = 2;
  const sumOfBarCode = transformArrayAndReverse.reduce((acc, curr) => {
    const result = curr * multiplier;
    multiplier = validationHelper.lessThanNinePlusMoreSendTwo(multiplier);

    return acc + result;
  }, 0);

  const restDivision = sumOfBarCode % 11;

  if (typeBillet === typeBilletsConstants.tituloBancario) {
    if (restDivision === 11 || restDivision === 10 || restDivision === 0) {
      return 1;
    }
  } else {
    if (restDivision === 0 || restDivision === 1) {
      return 0;
    } if (restDivision === 10) return 1;
  }

  return 11 - restDivision;
};

const isPayNumberValid = (fields, verifyCodes, typeBillet, barCode) => {
  if (typeBillet === typeBilletsConstants.tituloBancario) {
    if (calculationModule10(fields.fieldA) !== verifyCodes.verifyCodeA) throw createError(400, 'Erro no boleto bancario - dígito verificador do campo A não é válido.');
    if (calculationModule10(fields.fieldB) !== verifyCodes.verifyCodeB) throw createError(400, 'Erro no boleto bancario - dígito verificador do campo B não é válido.');
    if (calculationModule10(fields.fieldC) !== verifyCodes.verifyCodeC) throw createError(400, 'Erro no boleto bancario - dígito verificador do campo C não é válido.');
    if (calculationModule11(deleteFullVerifyCodeOnBarCode(barCode, typeBillet), typeBillet) !== verifyCodes.fullVerifyCode) throw createError(400, 'Erro no boleto bancario - dígito verificador geral não é válido.');
    return true;
  }
  const coinCode = findCoinCode(barCode);
  if (coinCode === '6' || coinCode === '7') {
    if (calculationModule10(deleteFullVerifyCodeOnBarCode(barCode, typeBillet)) !== verifyCodes.fullVerifyCode) throw createError(400, 'Erro no boleto de arrecadação - dígito verificador geral não é válido.');
  } else if (coinCode === '8' || coinCode === '9') {
    if (calculationModule11(deleteFullVerifyCodeOnBarCode(barCode, typeBillet)) !== verifyCodes.fullVerifyCode) throw createError(400, 'Erro no boleto de arrecadação - dígito verificador geral não é válido.');
  }
  return true;
};


const validate = (payNumber) => {
  if (!validationHelper.stringHasOnlyNumbers(payNumber)) throw createError(400, 'Linha digitável deve conter apenas números.');
  const typeBillet = findtypeBillet(payNumber.length);
  const fields = makeBilletFields(payNumber, typeBillet);
  const verifyCodes = makeVerifyCodes(payNumber, typeBillet);
  const barCode = makeBarCode(fields, typeBillet, verifyCodes);
  const amountCash = findAmountinCashInNumber(barCode, typeBillet);
  const expirationDate = findExpirationDate(payNumber, typeBillet);
  const normalizeBillet = normalizePayloadBillet(barCode, amountCash, expirationDate);
  isPayNumberValid(fields, verifyCodes, typeBillet, barCode);

  return normalizeBillet;
};

module.exports = {
  validate,
  findtypeBillet,
  makeBilletFields
};
