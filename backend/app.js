const express = require('express');

const app = express();
const user = require('./routes/userRoutes')
const video = require('./routes/videoRoutes')
const course = require('./routes/courseRoutes')
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const ebook = require('./routes/ebookRoutes')
const report = require('./routes/reportRoutes')
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api', user)
app.use('/api', video)
app.use('/api', course)
app.use('/api', ebook)
app.use('/api', report)
app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
