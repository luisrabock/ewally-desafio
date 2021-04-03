const createError = require('http-errors');
const validationHelper = require('../helpers/validationHelpers');
const tiposBoleto = require('../constants/bankBilletsConstants');

module.exports = {
  validate(PayNumber) {
    let tipoBoleto;
    if (!validationHelper.isANumber(PayNumber)) throw createError(400, 'Linha digitável deve conter apenas números.');

    if (PayNumber.length === 47) {
      tipoBoleto = tiposBoleto.tituloBancario;
    } else if (PayNumber.length === 48) {
      tipoBoleto = tiposBoleto.pagamentoConcessionaria;
    } else {
      throw createError(400, 'Linha digitável está inválida. Ela deve ser formada por 47 ou 48 dígitos.');
    }

    console.log('tipoBoleto...', tipoBoleto);

    return { barCode: '21299758700000020000001121100012100447561740', amount: '“20.00', expirationDate: new Date() };
  },
};
