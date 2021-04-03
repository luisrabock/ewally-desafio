// const logger = require('../config/logger');
const BankBilletsService = require('../services/BankBilletsService');

module.exports = {
  async validate(req, res, next) {
    try {
      const { PayNumber } = req.params;

      const response = BankBilletsService.validate(PayNumber);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
      return err;
    }
  },
};
