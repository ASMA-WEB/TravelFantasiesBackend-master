var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var TourCategorySchema = mongoose.Schema({
  Name: String,
  Description: String,

});
var TourCategory = mongoose.model("Tour_Category", TourCategorySchema,"Tour_Category");

function validateTourCategory(data) {
  const schema = Joi.object({
     Name: Joi.string(),
      Description: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.TourCategory = TourCategory;
module.exports.validate = validateTourCategory;
