var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var TourReviewSchema = mongoose.Schema({
  Ratings: Number,
  Comment: String,
  TourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
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
var TourReview = mongoose.model(
  "Tour_Reviews",
  TourReviewSchema,
  "Tour_Reviews"
);

function validateTourReview(data) {
  const schema = Joi.object({
    Ratings: Joi.number().required(),
    Comment: Joi.string().required(),
    Date: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.TourReview = TourReview;
module.exports.validate = validateTourReview;