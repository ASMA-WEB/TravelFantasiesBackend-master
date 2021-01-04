var express = require("express");
const fs = require("fs");
let router = express.Router();
var { TourCategory } = require("../../models/tourCategory");
const multer = require("multer");
const { request, response } = require("../../app");
const validateTourCategory = require("../../middlewares/validateTourCategory");

router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let category = await TourCategory.find().skip(0).limit(perPage);
  res.contentType("json");
  console.log(category);
  return res.send(category);
});

/* GET single Tour . */

router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotel = await TourCategory.findById(req.params.id);
    if (!hotel)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotel);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateTourCategory, async (req, res) => {
  let hotel = await TourCategory.findById(req.params.id);
  hotel.Name = req.body.CategoryName;
  hotel.Description = req.body.Description;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await TourCategory.findByIdAndDelete(req.params.id);
  return res.send(hotel);
});
//validateTourCategory
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const hotel = new TourCategory();
    hotel.Name = req.body.CategoryName;
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
