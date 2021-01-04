var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var blogsRouter = require("./routes/api/Blogs");
var ToursRouter = require("./routes/api/Tours");
var hotelsRouter = require("./routes/api/Hotels");
var hotelBookingRouter = require("./routes/api/hotelBooking");
var hotelCategoryRouter = require("./routes/api/hotelCategory");
var tourCategoryRouter = require("./routes/api/tourCategory");
var placesRouter = require("./routes/api/Place");
var roomCategoryRouter = require("./routes/api/roomCategory");
var roomRouter = require("./routes/api/rooms");
var blogCategoryRouter = require("./routes/api/blogCategory");
var hotelReviewRouter = require("./routes/api/hotelReview");

// var bodyParser = require("body-parser");
// var fs = require("fs");
// var path = require("path");
//
// require("dotenv/config");
var config = require("config");
var app = express();
app.use(cors());
// var upload = multer({ storage: storage });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   cors({
//     origin: ["http://localhost:4000"],
//     header: "Access-Control-Allow-Origin",
//   })
// );

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/tours", ToursRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/hotelBookings", hotelBookingRouter);
app.use("/api/tourCategory", tourCategoryRouter);
app.use("/api/places", placesRouter);
app.use("/api/hotelCategory", hotelCategoryRouter);
app.use("/api/roomCategory", roomCategoryRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/Blog", blogsRouter);
app.use("/api/BlogCategory", blogCategoryRouter);
app.use("/api/hotelReview", hotelReviewRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// mongoose
//   .connect(config.get("db"), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to Mongo...."))
//   .catch((error) => console.log(error.message));
mongoose
  .connect(
    "mongodb+srv://Sadia:E70141C7@cluster0.2il5f.mongodb.net/TravelFantasies?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
module.exports = app;
