const express = require('express');

const app = express();
const user = require('./routes/userRoutes')
const video = require('./routes/videoRoutes')
const course = require('./routes/courseRoutes')
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api',user)
app.use('/api',video)
app.use('/api',course)
app.use('*', (req, res, next) => {
  res.json({
    message: "Sucessfully connected"
  })
});

module.exports = app;