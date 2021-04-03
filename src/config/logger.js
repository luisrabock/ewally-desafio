  
/* eslint-disable new-cap */
const { createLogger, format, transports } = require('winston');

const {
  combine, label, timestamp, printf,
} = format;

const myFormat = printf((info) => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);

const logger = new createLogger({
  level: 'info',
  format: combine(
    label({ label: 'main' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error', colorize: true }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}
module.exports = logger;