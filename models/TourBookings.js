var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var TourBookingsSchema = mongoose.Schema({
  Booking_Date: String,
  PlaceNmae: String,
  Host_id: String,
  Arrival_Time: String,
  Departure_Time: String,
  Start_Date: String,
  End_Date: String,
  No_of_Days: Number,
  Cost: Number,
  Persons: Number,
});
var tourBookings = mongoose.model(
  "tourBookings",
  TourBookingsSchema,
  "tourBookings"
);

function validateTourBookings(data) {
  const schema = Joi.object({
    Booking_Date: Joi.string(),
    PlaceNmae: Joi.string(),
    Host_id: Joi.string(),
    Arrival_Time: Joi.string(),
    Departure_Time: Joi.string(),
    No_of_Days: Joi.number(),
    Cost: Joi.number(),
    Start_Date: Joi.string(),
    End_Date: Joi.string(),
    Persons: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.tourBookings = tourBookings;
module.exports.validate = validateTourBookings;