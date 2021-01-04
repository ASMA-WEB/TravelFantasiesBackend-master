var express = require("express");
const validateHotelBooking = require("../../middlewares/validateHotelBooking");
let router = express.Router();
var { HotelReview } = require("../../models/hotel_reviews");
const fs = require("fs");
const multer = require("multer");
const _ = require("underscore-node");
const { sum } = require("lodash");
const { contains } = require("underscore-node");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/sidra/Desktop/Backend/travel/public/images/hotels");
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
  let Reviews = await HotelReview.find().skip(skipRecords).limit(perPage);
  res.contentType("json");
  console.log(Reviews);
  return res.send(Reviews);
});

/* GET single HotelReview . */
router.get("/:id", async (req, res) => {
  let avg = 0;
  try {
    let countUser = await HotelReview.find({
      HotelId: req.params.id,
    }).countDocuments();
    //console.log("count is " + countUser);
    await HotelReview.find(
      { HotelId: req.params.id },
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
    return res.status(200).json({ Average: avg });
  } catch (err) {
    return res.status(400).send(err);
  }
});
router.get("/Review/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotelReview = await HotelReview.find({
      HotelId: req.params.id,
    });
    if (!hotelReview)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotelReview);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateHotelBooking, async (req, res) => {
  let HotelReviews = await HotelReview.findById(req.params.id);
  HotelReviews.Ratings = req.body.Ratings;
  HotelReviews.Comment = req.body.Comment;
  HotelReviews.HotelId = req.body.Hotel_id;
  // HotelReviews.Image.data = fs.readFileSync(req.file.path);
  // HotelReviews.Image.contentType = req.file.mimetype;
  HotelReviews.file = req.files;
  HotelReviews.Date = req.body.Date;

  //  HotelBooking. UserId= req.body.User_id;
  await HotelReviews.save();
  return res.send(HotelReviews);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let HotelReviews = await HotelReview.findByIdAndDelete(req.params.id);
  return res.send(HotelReviews);
});

/* Insert Record */
//;
router.post("/", upload.single("file"), async (req, res) => {
  let HotelReviews = new HotelReview();
  console.log(req.body);
  HotelReviews.Ratings = req.body.Ratings;
  HotelReviews.Comment = req.body.Comment;
  HotelReviews.HotelId = req.body.HotelId;
  HotelReviews.UserId = req.body.UserId;
  HotelReviews.Username = req.body.Username;
  // HotelReviews.Name = req.body.Name;
  HotelReviews.Date = req.body.Date;
  HotelReviews.Image.data = fs.readFileSync(req.file.path);
  HotelReviews.Image.contentType = req.file.mimetype;
  await HotelReviews.save();
  return res.send("Refresh the Page To View Your Review");
});
module.exports = router;
