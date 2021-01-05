var express = require("express");
const validateBookPackages = require("../../middlewares/validateBookPackages");
let router = express.Router();
var { Bookpackage } = require("../../models/BookPackages");

/* GET TourBookings listing. */
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let bookings = await Bookpackage.find().skip(skipRecords).limit(perPage);
  return res.send(bookings);
});

/* GET single TourBooking . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let bookPackage = await Bookpackage.findById(req.params.id);
    if (!bookPackage)
      return res
        .status(400)
        .send("Tour Booking with given ID is not present ");
    return res.send(bookPackage);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateBookPackages, async (req, res) => {
  let BookPackages = await Bookpackage.findById(req.params.id);
  BookPackages.Booking_Date = req.body.Booking_Date;
  BookPackages.PackageName = req.body.PackageName;
  BookPackages.Host_id = req.body.Host_id;
  BookPackages.Arrival_Time = req.body.Arrival_Time;
  BookPackages.Departure_Time = req.body.Departure_Time;
  BookPackages.Start_Date = req.body.Start_Date;
  BookPackages.End_Date = req.body.End_Date;
  BookPackages.No_of_Days = req.body.No_of_Days;
  BookPackages.Cost = req.body.Cost;
  BookPackages.Persons = req.body.Persons;
  BookPackages.Meal = req.body.Meal;
  BookPackages.Location = req.body.Location;
  BookPackages.Hotel = req.body.Hotel;
  BookPackages.Discount = req.body.Discount;
  await BookPackages.save();
  return res.send(BookPackages);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let Tour = await Bookpackage.findByIdAndDelete(req.params.id);
  return res.send(Tour);
});

/* Insert Record */
router.post("/", async (req, res) => {
    console.log('----Testing---',req.body)
  let BookPackages = new Bookpackage();
  BookPackages.Booking_Date = req.body.Booking_Date;
  BookPackages.PackageName = req.body.PackageName;
  BookPackages.Host_id = req.body.Host_id;
  BookPackages.Arrival_Time = req.body.Arrival_Time;
  BookPackages.Departure_Time = req.body.Departure_Time;
  BookPackages.Start_Date = req.body.Start_Date;
  BookPackages.End_Date = req.body.End_Date;
  BookPackages.No_of_Days = req.body.No_of_Days;
  BookPackages.Cost = req.body.Cost;
  BookPackages.Persons = req.body.Persons;
  BookPackages.Meal = req.body.Meal;
  BookPackages.Location = req.body.Location;
  BookPackages.Hotel = req.body.Hotel;
  BookPackages.Discount = req.body.Discount;
 let result = await BookPackages.save();
 console.log('---resu---', result)
 if(result._id){
     return res.status(200).json({message:"Successfully Created"});
 }else {
    return res.status(423).json({message:"Something went wrong!"});
 }
});
module.exports = router;