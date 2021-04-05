const BilletsService = require('../../src/api/services/BilletsService');
const typeBilletsConstants = require('../../src/constants/typeBilletsConstants');
const utils = require('../utils/utilsTest')
const constants = require('../constants/testConstants');

describe('Test billets service', () => {
  let randomValidPayNumberLength;
  let randomValidPayNumberBankBillet;
  const validStaticPayNumberLengthBankBillet = constants.validStaticPayNumberLengthBankBillet;
  const validStaticPayNumberLengthConcessionaria = constants.validStaticPayNumberLengthConcessionaria;
  const validStaticPayNumberPagamentoConcessionaria = constants.validStaticPayNumberPagamentoConcessionaria;
  const invalidStaticPayNumberLength = constants.invalidStaticPayNumberLength;
  const arrayPayNumberBankBillet = constants.arrayPayNumberBankBillet;
  const arrayPayNumberConcessionaria = constants.arrayPayNumberConcessionaria;
  const arrayPayNumberLength = constants.arrayPayNumberLength;

  beforeAll(() => {
    randomValidPayNumberLength = utils.getRandomItem(arrayPayNumberLength);
    randomValidPayNumberBankBillet = utils.getRandomItem(arrayPayNumberBankBillet);
  });
  it('Receive a valid bank billet payNumber Length and return a bank billet type', async () => {
    const isValidLengthPayNumber = BilletsService.findtypeBillet(validStaticPayNumberLengthBankBillet); 
    expect(isValidLengthPayNumber).toBe(typeBilletsConstants.tituloBancario);
  });

  it('Receive a valid Pagamento concessionaria payNumber Length and return a Pagamento concessionaria type', async () => {
    const isValidLengthPayNumber = BilletsService.findtypeBillet(validStaticPayNumberLengthConcessionaria); 
    expect(isValidLengthPayNumber).toBe(typeBilletsConstants.pagamentoConcessionaria);
  });

  it('Receive a invalid payNumber Length and throw an error', async () => {
    expect(() => {
      BilletsService.findtypeBillet(invalidStaticPayNumberLength);
    }).toThrow();
  });
});