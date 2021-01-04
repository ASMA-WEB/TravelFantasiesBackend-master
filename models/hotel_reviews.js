var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelReviewSchema = mongoose.Schema({
  Ratings: Number,
  Comment: String,
  HotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  Username: String,
  Image: {
    data: Buffer,
    contentType: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Date: String,
});
var HotelReview = mongoose.model(
  "Hotel_Reviews",
  HotelReviewSchema,
  "Hotel_Reviews"
);

function validateHotelReview(data) {
  const schema = Joi.object({
    Ratings: Joi.number().required(),
    Comment: Joi.string().required(),
    Date: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.HotelReview = HotelReview;
module.exports.validate = validateHotelReview;
