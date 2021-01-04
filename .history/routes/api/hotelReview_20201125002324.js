var express = require("express");
const validateHotelBooking = require("../../middlewares/validateHotelBooking");
let router = express.Router();
var { HotelReview } = require("../../models/hotel_reviews");
const fs = require("fs");
const multer = require("multer");

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
  return res.send(Reviews);
});

/* GET single HotelBooking . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotelBooking = await HotelReview.findById(req.params.id);
    if (!hotelBooking)
      return res
        .status(400)
        .send("Hotel Booking with given ID is not present ");
    return res.send(hotelBooking);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateHotelBooking, async (req, res) => {
  let HotelBooking = await HotelReview.findById(req.params.id);
  HotelBooking.Booking_Date = req.body.Booking_Date;
  HotelBooking.Room_id = req.body.Room_id;
  HotelBooking.Guest_id = req.body.Guest_id;
  HotelBooking.Arrival_Time = req.body.Arrival_Time;
  HotelBooking.Departure_Time = req.body.Departure_Time;
  HotelBooking.No_of_Days = req.body.No_of_Days;
  HotelBooking.Cost = req.body.Cost;
  HotelBooking.Check_in_Date = req.body.Check_in_Date;
  HotelBooking.Check_out_Date = req.body.Check_out_Date;
  HotelBooking.No_of_Guests = req.body.No_of_Guests;
  await HotelBooking.save();
  return res.send(HotelBooking);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let Hotel = await HotelReview.findByIdAndDelete(req.params.id);
  return res.send(Hotel);
});

/* Insert Record */
router.post("/", validateHotelBooking, async (req, res) => {
  let HotelBooking = new HotelReview();
  HotelBooking.Ratings = req.body.Ratings;
  HotelBooking.Comment = req.body.Comment;
  HotelBooking.HotelId = req.body.Hotel_id;
  //  HotelBooking. UserId= req.body.User_id;
  await HotelBooking.save();
  return res.send(HotelBooking);
});
module.exports = router;
