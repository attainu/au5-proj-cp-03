const express = require('express');

const app = express();
const user = require('./routes/userRoutes')
const video = require('./routes/videoRoutes')
const course = require('./routes/courseRoutes')
const userRouter = require('./routes/userRoutes');
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api',user)
app.use('/api',video)
app.use('/api',course)
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  res.json({
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`
  })
});

module.exports = app