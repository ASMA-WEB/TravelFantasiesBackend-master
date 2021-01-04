var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelSchema = mongoose.Schema({
  HotelName: String,
  Location: String,
  Image: {
    data: Buffer,
    contentType: String,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HotelCategory",
  },
  Address: String,
  Contactno: String,
  Website: String,
  Facilities: String,
  Status: String,
  Cost: Number,
  Ratings: Number,
  Latitude: Number,
  Longitude: Number,
});
var Hotel = mongoose.model("Hotel", HotelSchema);

function validateHotel(data) {
  const schema = Joi.object({
    HotelName: Joi.string(),
    Location: Joi.string().required(),
    Address: Joi.string().required(),
    Contactno: Joi.string(),
    Website: Joi.string().required(),
    Facilities: Joi.string().required(),
    Status: Joi.string(),
    Cost: Joi.number().required(),
    Ratings: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
