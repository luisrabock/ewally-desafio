// const logger = require('../config/logger');

module.exports = {
  async validate(req, res) {
    return res.json({ barCode: '21299758700000020000001121100012100447561740', amount: '“20.00', expirationDate: new Date() });
  },
};
