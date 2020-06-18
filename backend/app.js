const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.all('*', (req, res, next) => {
  res.json({
    message: "Sucessfully connected"
  })
});

module.exports = app;