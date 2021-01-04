var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var userSchema = mongoose.Schema({
  Name: String,
  Age: Number,
  CNIC: String,
  Gender: String,
  Contact_no: String,
  Email: String,
  Password: String,
  Role: String,
});
var User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    Name: Joi.string().min(4).max(10).required(),
    Age: Joi.number().min(0).max(99),
    CNIC: Joi.string().min(15).max(15),
    Gender: Joi.string(),
    Email: Joi.string().required(),
    Contact_no: Joi.string(),
    Password: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.User = User;
module.exports.validate = validateUser;
