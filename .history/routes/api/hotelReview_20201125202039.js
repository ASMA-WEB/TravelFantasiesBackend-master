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
  res.contentType("json");
  console.log(Reviews);
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
router.post("/", upload.array("file", 10), async (req, res) => {
  let HotelReviews = new HotelReview();
  HotelReviews.Ratings = req.body.Ratings;
  HotelReviews.Comment = req.body.Comment;
  HotelReviews.HotelId = req.body.Hotel_id;
  HotelReviews.Date = req.body.Date;
  // var img = fs.readFileSync(req.file.path);
  // var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database
  req.files.map((file) => {
    let data = await fs.readFile('req.file');

    // Convert to Base64 and print out a bit to show it's a string
    let base64 = data.toString('base64');
    console.log(base64.substr(0,200));

    // Feed out string to a buffer and then put it in the database
    let burger = new Buffer(base64, 'base64');
    HotelReviews.Image = [{ contentType: file.mimetype, data: file.path }];
  });

  // HotelReviews.Image.contentType = ;
  // HotelReviews.Image.data = new Buffer(encode_image, "base64");
  // const promises = req.files.map((file) => {
  //   const image = new Image(file.buffer); // create the new Image
  //   return image.save; // return the promise without calling it yet
  // });

  // const images = await Promise.all(promises); // calls all the porimises returned in `promises`
  // HotelReviews.Image.data = fs.readFileSync(req.file.path);
  // HotelReviews.Image.contentType = req.file.mimetype;
  //  HotelBooking. UserId= req.body.User_id;
  // (HotelReviews.Image = images);
  await HotelReviews.save();
  return res.send(HotelReviews);
});
module.exports = router;
