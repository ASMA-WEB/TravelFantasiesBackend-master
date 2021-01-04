var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelBookingSchema = mongoose.Schema({
  Booking_Date: String,
  Room_id: String,
  Guest_id: String,
  Arrival_Time: String,
  Departure_Time: String,
  No_of_Days: Number,
  Cost: Number,
  Check_in_Date: String,
  Check_out_Date: String,
  No_of_Guests: Number,
});
var hotelBookings = mongoose.model(
  "hotelBookings",
  HotelBookingSchema,
  "hotelBookings"
);

function validateHotelBooking(data) {
  const schema = Joi.object({
    Booking_Date: Joi.string(),
    Room_id: Joi.string(),
    Guest_id: Joi.string(),
    Arrival_Time: Joi.string(),
    Departure_Time: Joi.string(),
    No_of_Days: Joi.number(),
    Cost: Joi.number(),
    Check_in_Date: Joi.string(),
    Check_out_Date: Joi.string(),
    No_of_Guests: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.hotelBookings = hotelBookings;
module.exports.validate = validateHotelBooking;
