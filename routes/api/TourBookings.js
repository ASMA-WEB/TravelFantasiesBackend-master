var express = require("express");
const validateTourBookings = require("../../middlewares/validateTourBookings");
let router = express.Router();
var { tourBookings } = require("../../models/TourBookings");

/* GET TourBookings listing. */
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let bookings = await tourBookings.find().skip(skipRecords).limit(perPage);
  return res.send(bookings);
});

/* GET single TourBooking . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tourBooking = await tourBookings.findById(req.params.id);
    if (!tourBooking)
      return res
        .status(400)
        .send("Tour Booking with given ID is not present ");
    return res.send(tourBooking);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateTourBookings, async (req, res) => {
  let TourBookings = await tourBookings.findById(req.params.id);
  TourBookings.Booking_Date = req.body.Booking_Date;
  TourBookings.PlaceNmae = req.body.PlaceNmae;
  TourBookings.Host_id = req.body.Host_id;
  TourBookings.Arrival_Time = req.body.Arrival_Time;
  TourBookings.Departure_Time = req.body.Departure_Time;
  TourBookings.Start_Date = req.body.Start_Date;
  TourBookings.End_Date = req.body.End_Date;
  TourBookings.No_of_Days = req.body.No_of_Days;
  TourBookings.Cost = req.body.Cost;
  TourBookings.Persons = req.body.Persons;
  await TourBookings.save();
  return res.send(TourBookings);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let Tour = await TourBookings.findByIdAndDelete(req.params.id);
  return res.send(Tour);
});

/* Insert Record */
router.post("/", validateTourBookings, async (req, res) => {
  let TourBookings = new tourBookings();
  TourBookings.Booking_Date = req.body.Booking_Date;
  TourBookings.PlaceNmae = req.body.PlaceNmae;
  TourBookings.Host_id = req.body.Host_id;
  TourBookings.Arrival_Time = req.body.Arrival_Time;
  TourBookings.Departure_Time = req.body.Departure_Time;
  TourBookings.Start_Date = req.body.Start_Date;
  TourBookings.End_Date = req.body.End_Date;
  TourBookings.No_of_Days = req.body.No_of_Days;
  TourBookings.Cost = req.body.Cost;
  TourBookings.Persons = req.body.Persons;
  await TourBookings.save();
  return res.send(TourBookings);
});
module.exports = router;
