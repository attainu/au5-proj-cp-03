const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const userRouter = require('./routes/userRoutes');

app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  res.json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`
  })
});

module.exports = app;