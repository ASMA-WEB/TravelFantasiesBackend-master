var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var RoomSchema = mongoose.Schema({
  Image: {
    data: Buffer,
    contentType: String
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomCategory",
    },
  HotelId: {
       type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    },
    Description: String,
    NumberOfRooms: Number,
  Cost: Number,
  Facilities: [String],

});
var Room = mongoose.model("Room", RoomSchema);

function validateRoom(data) {
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
module.exports.Room = Room;
module.exports.validate = validateRoom;
