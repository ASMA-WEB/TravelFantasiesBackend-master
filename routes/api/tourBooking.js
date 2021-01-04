var express = require("express");
const validateTourBooking = require("../../middlewares/validateTourBooking");
let router = express.Router();
var { tourBookings } = require("../../models/tour_bookings");

/* GET HotelBookings listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let bookings = await tourBookings.find().skip(skipRecords).limit(perPage);
  return res.send(bookings);
});

/* GET single HotelBooking . */
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
router.put("/:id", validateTourBooking, async (req, res) => {
  let TourBooking = await tourBookings.findById(req.params.id);
  TourBooking.Booking_Date = req.body.Booking_Date;
  TourBooking.Room_id = req.body.Room_id;
  TourBooking.Guest_id = req.body.Guest_id;
  TourBooking.Arrival_Time = req.body.Arrival_Time;
  TourBooking.Departure_Time = req.body.Departure_Time;
  TourBooking.No_of_Days = req.body.No_of_Days;
  TourBooking.Cost = req.body.Cost;
  TourBooking.Check_in_Date = req.body.Check_in_Date;
  TourBooking.Check_out_Date = req.body.Check_out_Date;
  TourBooking.No_of_Guests = req.body.No_of_Guests;
  await TourBooking.save();
  return res.send(TourBooking);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let Tour = await TourBooking.findByIdAndDelete(req.params.id);
  return res.send(Hotel);
});

/* Insert Record */
router.post("/", validateTourBooking, async (req, res) => {
  let TourBooking = new tourBookings();
  TourBooking.Booking_Date = req.body.Booking_Date;
  TourBooking.Room_id = req.body.Room_id;
  TourBooking.Guest_id = req.body.Guest_id;
  TourBooking.Arrival_Time = req.body.Arrival_Time;
  TourBooking.Departure_Time = req.body.Departure_Time;
  TourBooking.No_of_Days = req.body.No_of_Days;
  TourBooking.Cost = req.body.Cost;
  TourBooking.Check_in_Date = req.body.Check_in_Date;
  TourBooking.Check_out_Date = req.body.Check_out_Date;
  TourBooking.No_of_Guests = req.body.No_of_Guests;
  await TourBooking.save();
  return res.send(TourBooking);
});
module.exports = router;
