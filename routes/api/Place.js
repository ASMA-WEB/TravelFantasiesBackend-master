var express = require("express");
let router = express.Router();
const validatePlace = require("../../middlewares/validatePlace");
var { Place } = require("../../models/places");

const fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:Users/DeLL/Documents/GitHub/TravelFantasies/public/images/places");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});
//.any('file')

/* GET places listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 30);
  let skipRecords = perPage * (page - 1);
  let places = await Place.find().skip(skipRecords).limit(perPage);
  //let places = await Place.find();
  return res.send(places);
});

/* GET single hotel . */
router.get("/:id", async (req, res) => {
  try {
    let place = await Place.findById(req.params.id);
    if (!place)
      return res.status(400).send("Place with given ID is not present ");
    return res.send(place);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});


// /* Update Record */
router.put("/:id",validatePlace, upload.single("file"), async (req, res) => {
  let place = await Place.findById(req.params.id);
  place.place_name = req.body.place_name;
  place.City = req.body.City;
  place.Description = req.body.Description;
  place.Image.data = fs.readFileSync(req.file.path);
  place.Image.contentType = req.file.mimetype;
  await place.save();
  return res.send(place);
});


/* Insert Record */
router.post("/",validatePlace, upload.single("file"), async (req, res) => {
  let place = new Place();
  place.place_name = req.body.place_name;
  place.City = req.body.City;
  place.Description = req.body.Description;
  place.Image.data = fs.readFileSync(req.file.path);
  place.Image.contentType = req.file.mimetype;
  await place.save();
  return res.send(place);
});
module.exports = router;
