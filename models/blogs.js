var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var BlogSchema = mongoose.Schema({
    Title: String,
    Image: {
      data: Buffer,
      contentType: String
    },
    Description : String,
    Time : {type : Date, default : Date.now},
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogCategory",
        }});
        var Blog = mongoose.model("BLOG", BlogSchema,"BLOG");

function validateBlog(data) {
  const schema = Joi.object({
    BlogTitle: Joi.string(),
    Description: Joi.string()
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Blog = Blog;
module.exports.validate = validateBlog;