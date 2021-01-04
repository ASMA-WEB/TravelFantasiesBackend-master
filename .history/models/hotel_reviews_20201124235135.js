var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelReviewSchema = mongoose.Schema(
  {
    Ratings: Number,
    Comment: String,
    HotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    //    UserId:
  },
  { timestamps: true }
);
var HotelCategory = mongoose.model(
  "Hotel_Reviews",
  HotelReviewSchema,
  "Hotel_Reviews"
);

function validateHotelCategory(data) {
  const schema = Joi.object({
    CategoryName: Joi.string(),
    Description: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.HotelCategory = HotelCategory;
module.exports.validate = validateHotelCategory;
