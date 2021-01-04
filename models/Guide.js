var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError, string } = require("@hapi/joi");
const User = require("./users");

var GuideSchema = mongoose.Schema({
  GuideName: String,
  Description: String,
  Images: {
    data: Buffer,
   contentType: String,
  },
  Details: String,
  Cost: Number,
  Experience: String,
  Visted_Places: String,
  Languages: String,
  Guide_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Status: {
    type: Boolean,
    enum: ["true", "false"],
  },
  
});

var Guide = mongoose.model("Guide", GuideSchema);

function validateGuide(data) {
  const schema = Joi.object({
    GuideName: Joi.string(),
    Description: Joi.string(),
    Images: Joi.string(),
    Guide_Id: Joi.string(),
    Status: Joi.required(),
    Details: Joi.string(),
    Cost: Joi.required(),
    Experience: Joi.string(),
    Visted_Places: Joi.string(),
    Languages: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}


module.exports.Guide = Guide;
module.exports.validate = validateGuide;