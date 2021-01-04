var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var BookPackageSchema = mongoose.Schema({
  Booking_Date: String,
  PackageName: String,
  Host_id: String,
  Arrival_Time: String,
  Departure_Time: String,
  Start_Date: String,
  End_Date: String,
  No_of_Days: Number,
  Cost: Number,
  Persons: Number,
});
var Bookpackage = mongoose.model(
  "Bookpackage",
  BookPackageSchema,
  
);

function validateBookPackages(data) {
  const schema = Joi.object({
    Booking_Date: Joi.string(),
    PackageName: Joi.string(),
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
module.exports.Bookpackage = Bookpackage;
module.exports.validate = validateBookPackages;