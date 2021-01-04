var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var RoomCategorySchema = mongoose.Schema({
  CategoryName: String,
  Description: String,

});
var RoomCategory = mongoose.model("RoomCategory", RoomCategorySchema);

function validateRoomCategory(data) {
  const schema = Joi.object({
      CategoryName: Joi.string(),
      Description: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.RoomCategory = RoomCategory;
module.exports.validate = validateRoomCategory;
