var express = require("express");
const validateHotel = require("../../middlewares/validateHotel");
const fs = require('fs');
let router = express.Router();
var { Hotel } = require("../../models/hotels");
const multer = require("multer");
const { request, response } = require("../../app");
const validateHotelCategory = require("../../middlewares/validateHotelCategory");


router.post("/hotelCategory", validateHotelCategory, async (req, res) => {
  try {
    const hotel = new Hotel();
    console.log(req.body);
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