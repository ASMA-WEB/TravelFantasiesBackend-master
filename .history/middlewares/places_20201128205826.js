var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var PlaceSchema = mongoose.Schema({
  place_name: String,
  City: String,
  Description: String,
  Images: {
    data: Buffer,
    contentType: String
  },
});
  var Place = mongoose.model("Place_Detail", PlaceSchema,"Place_Detail" );

function validatePlace(data) {
  const schema = Joi.object({
    place_name: Joi.string(),
    City: Joi.string().required(),
    Description: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Place = Place;
module.exports.validate = validatePlace;
