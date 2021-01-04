var express = require("express");
const validateRoom = require("../../middlewares/validateRoom");
const fs = require('fs');
let router = express.Router();
var { Room } = require("../../models/rooms");
const multer = require("multer");
const { request, response } = require("../../app");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/sidra/Desktop/Backend/travel/public/images/rooms");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },

});

/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let hotels = await Hotel.find().skip(0).limit(perPage);
  res.contentType('json');
  console.log(hotels);
  return res.send(hotels);
});

/* GET single hotel . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotel);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateHotel, async (req, res) => {
  let hotel = await Hotel.findById(req.params.id);
  hotel.Hotel_Name = req.body.Hotel_Name;
  hotel.Location = req.body.Location;
  hotel.Address = req.body.Address;
  hotel.Image.data = fs.readFileSync(req.file.path);
  hotel.Image.contentType = req.file.mimetype;
  hotel.Contact_No = req.body.Contact_No;
  hotel.Website = req.body.Website;
  hotel.Facilities = req.body.Facilities;
  hotel.Availability_status = req.body.Availability_status;
  hotel.Cost = req.body.Cost;
  hotel.Ratings = 0;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await Hotel.findByIdAndDelete(req.params.id);
  return res.send(hotel);
});
// upload.single("Images"),
/* Insert Record */
// validateHotel;

router.post("/", upload.single('file'), validateHotel, async (req, res) => {
  try {
    const hotel = new Hotel();
        // console.log(req.file);
    // console.log(req.body);
    hotel.HotelName = req.body.HotelName;
    hotel.Location = req.body.Location;
    hotel.Image.data = fs.readFileSync(req.file.path);
    hotel.Image.contentType = req.file.mimetype;
    hotel.Address = req.body.Address;
    hotel.Contactno = req.body.Contactno;
    hotel.Website = req.body.Website;
    hotel.Facilities = req.body.Facilities;
    hotel.Status = req.body.Status;
    hotel.Cost = req.body.Cost;
    hotel.Ratings = 0;
    await hotel.save();
    // return res.send(hotel);
    return res.send("data");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  //res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
});
module.exports = router;
