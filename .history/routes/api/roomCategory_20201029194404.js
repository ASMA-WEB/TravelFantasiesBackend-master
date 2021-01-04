var express = require("express");
const fs = require('fs');
let router = express.Router();
var { RoomCategory } = require("../../models/roomCategory");
const multer = require("multer");
const { request, response } = require("../../app");
const validateRoomCategory = require("../../middlewares/validateRoomCategory");

router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let category = await RoomCategory.find().skip(0).limit(perPage);
  res.contentType('json');
  console.log(category);
  return res.send(category);
});

/* GET single hotel . */


router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotel = await RoomCategory.findById(req.params.id);
    if (!hotel)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotel);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
router.get("/category/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    console.log(req.params);
    let hotel = await RoomCategory.find({CategoryName: req.params.Category});
    if (!hotel)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotel);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateRoomCategory, async (req, res) => {
  let hotel = await RoomCategory.findById(req.params.id);
  hotel.CategoryName = req.body.CategoryName;
  hotel.Description = req.body.Description;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await RoomCategory.findByIdAndDelete(req.params.id);
  return res.send(hotel);
});

router.post("/", validateRoomCategory, async (req, res) => {
  try {

    console.log(req.body);
      const hotel = new RoomCategory();
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
