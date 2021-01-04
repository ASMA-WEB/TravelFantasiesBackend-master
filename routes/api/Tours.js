var express = require("express");
const validateTour = require("../../middlewares/validateTour");
const fs = require("fs");
let router = express.Router();
var { Tour } = require("../../models/Tours");
const multer = require("multer");
const { request } = require("../../app");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "E:/semester 8/Software Testing/TravelFantasies-master/public/images/tours"
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "images/jpeg" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "images/png"
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



router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let tours = await Tour.find().skip(0).limit(20);
  res.contentType("json");
  console.log(tours);
  return res.send(tours);
});

router.get("/firstthree", async (req, res) => {
  let tours = await Tour.find().limit(3);
  res.contentType("json");
  console.log(tours);
  return res.send(tours);
});

router.get("/find", async (req, res) => {
  console.log(req.query.tourname);
  let tours = await Tour.find({ TourName: req.query.tourname });
  res.contentType("json");
  console.log(tours);
  return res.send(tours);
});

/* GET single tour . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tour = await Tour.findById(req.params.id);
    if (!tour)
      return res.status(400).send("Tour with given ID is not present ");
    return res.send(tour);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

/* Update Record */
router.put("/:id", validateTour, async (req, res) => {
  console.log(asma);
  let tour = await Tour.findById(req.params.id);
  tour.TourName = req.body.TourName;
  tour.Location = req.body.Location;
  tour.Description = req.body.Description;
  tour.Images.data = fs.readFileSync(req.file.path);
  tour.Images.contentType = req.file.mimetype;
  tour.Host_Id = req.body.Host_Id;
  tour.Start_Date = req.body.Start_Date;
  tour.End_Date = req.body.End_Date;
  tour.Arrival_Time = req.body.Arrival_Time;
  tour.Departure_Time = req.body.Departure_Time;
  tour.Status = req.body.Status;
  tour.Total_Seats = req.body.Total_Seats;
  tour.Available_Seats = req.body.Available_Seats;
  tour.Tour_Type = req.body.Tour_Type;
  tour.Details = req.body.Details;
  tour.Cost = req.body.Cost;
  tour.Facilities = req.body.Facilities;
  tour.Ratings = req.body.Ratings;
  tour.no_of_days = req.body.no_of_days;
  hotel.Latitude = req.body.Latitude;
  hotel.Longitude = req.body.Longitude;
  await tour.save();
  return res.send(tour);
});

router.put("/approved/:id", validateTour, async (req, res) => {
  let tour = await Tour.findById(req.params.id);
  tour.Status = true;
  await tour.save();
  return res.send(tour);
});

router.delete("/unapproved/:id", validateTour, async (req, res) => {
  
  let tour = await Tour.findByIdAndDelete(req.params.id);
  return res.send("Tour has been Successfully Removed");
});


/* Delete Record */
router.delete("/:id", async (req, res) => {
  let tour = await Tour.findByIdAndDelete(req.params.id);
  return res.send("Tour has been Successfully Removed");
  //return res.send(tour);
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
  const tour = new Tour();
  console.log(req.body);
  tour.TourName = req.body.TourName;
  tour.Location = req.body.Location;
  tour.Description = req.body.Description;
  //tour.Image.data = fs.readFileSync(req.file.path);
  tour.Images.data = [],
  //tour.Image.contentType = req.file.mimetype;
  tour.Host_Id = req.body.Host_Id;
  tour.Start_Date = req.body.Start_Date;
  tour.End_Date = req.body.End_Date;
  tour.Arrival_Time = req.body.Arrival_Time;
  tour.Departure_Time = req.body.Departure_Time;
  tour.Status = req.body.Status;
  tour.Total_Seats = req.body.Total_Seats;
  tour.Available_Seats = req.body.Available_Seats;
  tour.Tour_Type = req.body.Tour_Type;
  tour.Cost = req.body.Cost;
  tour.Facilities = req.body.Facilities;
  tour.no_of_days = req.body.no_of_days;
  tour.Latitude = req.body.Latitude;
  tour.Longitude = req.body.Longitude;
  tour.AvgRatings = 0.0;
  tour.CountRatings = 0;
  await tour.save();
  return res.send(tour);
} catch (error) {
  console.log(error);
  res.send(error.message);
}
});






/* GET tours listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  // let page = Number(req.query.page ? req.quer y.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  //let tours = await Tour.find().skip(skipRecords).limit(perPage);
  let tours = await Tour.find({Status:true})
    .populate("Host_Id", "Name")
    .select("TourName Host_Id Images");
  return res.send(tours);
});

router.get("/unapproved", async (req, res) => {
  console.log("adssd")
  //res.send(["Pen", "Pencil"]);
  // let page = Number(req.query.page ? req.quer y.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  //let tours = await Tour.find().skip(skipRecords).limit(perPage);
  let tours = await Tour.find({Status:false})
    
  return res.send(tours);
});

/* GET single tour . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tour = await Tour.findById(req.params.id);
    if (!tour)
      return res.status(400).send("Tour with given ID is not present ");
    return res.send(tour);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

/* Update Record */
router.put("/:id", validateTour, async (req, res) => {
  let tour = await Tour.findById(req.params.id);
  tour.TourName = req.body.TourName;
  tour.Location = req.body.Location;
  tour.Description = req.body.Description;
  tour.Image.data = fs.readFileSync(req.file.path);
  tour.Image.contentType = req.file.mimetype;
  tour.Host_Id = req.body.Host_Id;
  tour.Start_Date = req.body.Start_Date;
  tour.End_Date = req.body.End_Date;
  tour.Arrival_Time = req.body.Arrival_Time;
  tour.Departure_Time = req.body.Departure_Time;
  tour.Status = req.body.Status;
  tour.Total_Seats = req.body.Total_Seats;
  tour.Available_Seats = req.body.Available_Seats;
  tour.Category = req.body.Category;
  tour.Cost = req.body.Cost;
  tour.Facilities = req.body.Facilities;
  tour.Ratings = req.body.Ratings;
  tour.no_of_days = req.body.no_of_days;
  await tour.save();
  return res.send(tour);
});

router.put("/approved/:id", async (req, res) => {
  
  let tour = await Tour.findById(req.params.id);
  tour.Status = req.body.Status;
  await tour.save();
  return res.send(tour);
});

router.delete("/unapproved/:id", async (req, res) => {
  
  let tour = await Tour.findByIdAndDelete(req.params.id);
  return res.send("Tour has been Successfully Removed");
});


/* Delete Record */
router.delete("/:id", async (req, res) => {
  let tour = await Tour.findByIdAndDelete(req.params.id);
  return res.send("Tour has been Successfully Removed");
  //return res.send(tour);
});



router.post("/",upload.single("file"), async (req, res) => {
  //console.log(req.file);
  try {
  const tour = new Tour();
  console.log(req.body);
  tour.TourName = req.body.TourName;
  tour.Location = req.body.Location;
  tour.Description = req.body.Description;
  //tour.Image.data = fs.readFileSync(req.body.file);
  tour.Images.data = [],
  //tour.Image.contentType = req.file.mimetype;
  tour.Host_Id = req.body.Host_Id;
  tour.Start_Date = req.body.Start_Date;
  tour.End_Date = req.body.End_Date;
  tour.Arrival_Time = req.body.Arrival_Time;
  tour.Departure_Time = req.body.Departure_Time;
  tour.Status = req.body.Status;
  tour.Total_Seats = req.body.Total_Seats;
  tour.Available_Seats = req.body.Available_Seats;
  tour.Category = req.body.Category;
  tour.Details = req.body.Details;
  tour.Cost = req.body.Cost;
  tour.Facilities = req.body.Facilities;
  tour.Ratings = req.body.Ratings;
  tour.no_of_days = req.body.no_of_days;
  await tour.save();
  return res.send(tour);
} catch (error) {
  console.log(error);
  res.send(error.message);
}
});

module.exports = router;
