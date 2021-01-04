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

//   Facilities: [String],
});
var Room = mongoose.model("Room", RoomSchema);

function validateRoom(data) {
  const schema = Joi.object({
    Category: Joi.required(),
    HotelId: Joi.required(),
    Description: Joi.string().required(),
    NumberOfRooms: Joi.number().required(),
      Cost: Joi.number().required(),
      AirConditioning: Joi.boolean(),

BathTub:  Joi.boolean(),
FreeWifi: Joi.boolean(),
HairDryer:  Joi.boolean(),
InRoomIron:  Joi.boolean(),
PremiumCoffee: Joi.boolean(),
RoomFridge:  Joi.boolean(),
RoomPurification:  Joi.boolean(),
Shower:  Joi.boolean(),
Television:  Joi.boolean(),
TeaMaker:  Joi.boolean(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Room = Room;
module.exports.validate = validateRoom;
