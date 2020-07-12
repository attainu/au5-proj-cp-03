const express = require("express");

const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const video = require("./routes/videoRoutes");
const courseRoutes = require("./routes/courseRoutes");
const ebook = require("./routes/ebookRoutes");
const quizRoutes = require("./routes/quizRoutes");
const postRoutes = require("./routes/postRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use("/api", video);
app.use("/api/course", courseRoutes);
app.use("/api", ebook);
app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/post", postRoutes);
app.use("/api/assignment", assignmentRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
