var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var userSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
});
var User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    Name: Joi.string().min(4).max(10).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.User = User;
module.exports.validate = validateUser;
