const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const BilletsRoutes = require('./routes/BilletsRoutes');
const swaggerDocument = require('./docs/swagger.json');

const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'production') app.use(morgan('common', { stream: fs.createWriteStream('./logs/api.log', { flags: 'a' }) }));
else app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(BilletsRoutes);

// 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Page not found'));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
  next();
});

module.exports = app;
