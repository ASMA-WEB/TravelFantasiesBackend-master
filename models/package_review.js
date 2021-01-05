var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var PackageReviewSchema = mongoose.Schema({
  Ratings: Number,
  Comment: String,
  Username: String,
  Email: String,
  
  Image: {
    data: Buffer,
    contentType: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

});
var PackageReview = mongoose.model(
  "Package_Reviews",
  PackageReviewSchema,
  "Package_Reviews"
);

function validatePackageReview(data) {
  const schema = Joi.object({
    Ratings: Joi.number().required(),
    Comment: Joi.string().required(),
    Username: Joi.string().required(),
    Email: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.PackageReview = PackageReview;
module.exports.validate = validatePackageReview;
