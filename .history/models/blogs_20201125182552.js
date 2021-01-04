var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var BlogsSchema = mongoose.Schema({
    Title: String,
    Link : String,
    Description : String,
    Time : {type : Date, default : Date.now},
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogCategory",
        }});
        var Blog = mongoose.model("Blog", BlogsSchema);

function validateBlog(data) {
  const schema = Joi.object({
    BlogTitle: Joi.string(),
    BlogLink: Joi.string().required(),
    Description: Joi.string()
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Blog = Blog;
module.exports.validate = validateBlog;