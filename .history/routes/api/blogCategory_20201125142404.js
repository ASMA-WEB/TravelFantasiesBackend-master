var express = require("express");
let router = express.Router();
var { BlogCategory } = require("../../models/blogCategory");
//const multer = require("multer");
const { request, response } = require("../../app");
const validateBlogCategory = require("../../middlewares/validateBloglCategory");

router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let category = await BlogCategory.find().skip(0).limit(perPage);
  res.contentType('json');
  console.log(category);
  return res.send(category);
});

/* GET single blog . */


router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let blogs = await BlogCategory.findById(req.params.id);
    if (!blogs)
      return res.status(400).send("Blog with given ID is not present ");
    return res.send(blogs);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateBlogCategory, async (req, res) => {
  let blogs = await BlogCategory.findById(req.params.id);
  blogs.Name = req.body.Name;
  blogs.Description = req.body.Description;
  await blogs.save();
  return res.send(blogs);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await HotelCategory.findByIdAndDelete(req.params.id);
  return res.send(hotel);
});

router.post("/", validateHotelCategory, async (req, res) => {
  try {

    console.log(req.body);
      const hotel = new HotelCategory();
    hotel.CategoryName = req.body.CategoryName;
    hotel.Description = req.body.Description;
  await hotel.save();
    // return res.send(hotel);
    return res.send("data");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  });

  module.exports = router;
