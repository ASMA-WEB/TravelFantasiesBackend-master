var express = require("express");
//const validateTour= require("../../middlewares/validateTour");
let router = express.Router();
var { TourReview } = require("../../models/tour_reviews");
const fs = require("fs");
const multer = require("multer");
const _ = require("underscore-node");
const { sum } = require("lodash");
const { contains } = require("underscore-node");
const { Hotel } = require("../../models/hotels");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/semester 8/Software Testing/TravelFantasies-master/public/images/tours");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});
//.any('file')

/* GET HotelReviews listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let Reviews = await TourReview.find().skip(skipRecords).limit(perPage);
  res.contentType("json");
  console.log(Reviews);
  return res.send(Reviews);
});

/* GET single HotelReview . */
router.get("/:id", async (req, res) => {
  let avg = 0;
  try {
    let countUser = await TourReview.find({
      TourId: req.params.id,
    }).countDocuments();
    //console.log("count is " + countUser);
    await TourReview.find(
      { TourId: req.params.id },
      async function (err, results) {
        if (err) {
          console.log(err);
        }

        let sum = _.reduce(
          results,
          function (memo, reading) {
            return memo + reading.Ratings;
          },
          0
        );
        // avg = sum;
        avg = sum / countUser;
        // console.log(sum);
        // console.log(avg);
      }
    );
    // avg = summ / countUser;
    console.log(avg);
    //if (!countUser) return res.status(400).send("No Reviews");
    return res.status(200).json({ Average: avg, noOfReviews: countUser });
  } catch (err) {
    return res.status(400).send(err);
  }
});


router.get("/Review/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tourReview = await TourReview.find({ TourId: req.params.id });
    if (!tourReview)
      return res.status(400).send("Tour with given ID is not present ");
    return res.send(hotelReview);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateTourBooking, async (req, res) => {
  let TourReviews = await TourReview.findById(req.params.id);
  TourReviews.Ratings = req.body.Ratings;
  TourReviews.Comment = req.body.Comment;
  TourReviews.TourId = req.body.Tour_id;
  // HotelReviews.Image.data = fs.readFileSync(req.file.path);
  // HotelReviews.Image.contentType = req.file.mimetype;
  TourReviews.file = req.files;
  TourReviews.Date = req.body.Date;

  //  HotelBooking. UserId= req.body.User_id;
  await TourReviews.save();
  return res.send(TourReviews);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let TourReviews = await TourReview.findByIdAndDelete(req.params.id);
  return res.send(TourReviews);
});


/* Insert Record */
//;
// upload.single("file"),
router.post("/", upload.single("file"), async (req, res) => {
  let TourReviews = new TourReview();
  let tour = await Tour.findById(req.body.TourId);
  let newRatings = 0;
  let countUser = 0;
  let newNoReviews = 0;
  let newAvg = 0;
  try {
    countUser = await TourReview.find({
      TourId: req.body.TourId,
    }).countDocuments();
    console.log("count is " + countUser);
    await TourReview.find(
      { TourId: req.body.TourId },
      async function (err, results) {
        if (err) {
          console.log(err);
        }

        let sum = _.reduce(
          results,
          function (memo, reading) {
            return memo + reading.Ratings;
          },
          0
        );
        // avg = sum;
        console.log(sum);
        //        avg = sum / countUser;

        newRatings = sum + req.body.Ratings;
        console.log(req.body.Ratings);
        // console.log(sum);
        // console.log(avg);
        //      console.log(avg);
        //if (!countUser) return res.status(400).send("No Reviews");
        // return res.status(200).json({ Average: avg, noOfReviews: countUser });

        console.log(newRatings);
        newNoReviews = countUser + 1;
        console.log(newNoReviews);
        newAvg = newRatings / newNoReviews;
        newAvg = newAvg.toFixed(1);
        console.log(newAvg);
        console.log(req.body);
      }
    );
    // avg = summ / countUser;
  } catch (err) {
    return res.status(400).send(err);
  }
  if (newAvg == 0) {
    tour.AvgRatings = req.body.ratings;
    tour.CountRatings = 1;
  } else {
    tour.AvgRatings = newAvg;
    tour.CountRatings = newNoReviews;
  }

  TourReviews.Ratings = req.body.Ratings;
  TourReviews.Comment = req.body.Comment;
  TourReviews.TourId = req.body.TourId;
  TourReviews.UserId = req.body.UserId;
  TourReviews.UserName = req.body.UserName;
  TourReviews.Date = req.body.Date;
  TourReviews.Image.data = fs.readFileSync(req.file.path);
  TourReviews.Image.contentType = req.file.mimetype;
  await TourReviews.save();
  await tour.save();
  //return res.send(hotel);
  return res.send("Refresh the Page To View Your Review");
});


module.exports = router;