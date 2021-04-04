const BilletsService = require('../services/BilletsService');

module.exports = {
  async validate(req, res, next) {
    try {
      const { PayNumber } = req.params;

      const response = BilletsService.validate(PayNumber);

      return res.status(200).json(response);
    } catch (err) {
      next(err);
      return err;
    }
  },
};
