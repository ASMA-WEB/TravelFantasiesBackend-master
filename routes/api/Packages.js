var express = require("express");
const validatePackages = require("../../middlewares/validatePackages");
const fs = require("fs");
let router = express.Router();
var { Packages } = require("../../models/Packages");
const multer = require("multer");
const { request, response } = require("../../app");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
const { runInNewContext } = require("vm");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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

/* GET PACKAGE listing. */
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let packages = await Packages.find().skip(0).limit(20);
  res.contentType("json");
  console.log(packages);
  return res.send(packages);
});
router.get("/firstthree", async (req, res) => {
  let packages = await Packages.find().limit(3);
  res.contentType("json");
  console.log(packages);
  return res.send(packages);
});

/* GET single package . */

router.get("/:id", async (req, res) => {
  try {
    let package = await Package.findById(req.params.id);
    if (!package)
      return res.status(400).send("package with given ID is not present ");
    return res.send(package);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validatePackages, async (req, res) => {
  let packages = await Packages.findById(req.params.id);
  packages.PackageName = req.body.PackageName;
  packages.Cost = req.body.Cost;
  packages.Description = req.body.Description;
  packages.Meal = req.body.Meal;
  packages.Hotel = req.body.Hotel;
  packages.no_of_days = req.body.no_of_days;
  packages.AllowedPersons = req.body.AllowedPersons;
  packages.Location = req.body.Location;
  packages.Status = req.body.Status;
  packages.Image.data = fs.readFileSync(req.file.path);
  packages.Image.contentType = req.file.mimetype;

  await packages.save();
  return res.send(packages);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let packages = await Packages.findByIdAndDelete(req.params.id);
  return res.send("Packages has been Successfully Removed");
});

router.post("/", upload.array("photos", 5), async (req, res) => {
  let imgPath = [];
  req.files.forEach((n) => {
    imgPath.push(n.path);
  });

  try {
    const packages = new Packages();
    console.log(req.body);
    packages.PackageName = req.body.PackageName;
    packages.Cost = req.body.Cost;
    packages.Description = req.body.Description;
    packages.Meal = req.body.Meal;
    packages.Hotel = req.body.Hotel;
    packages.no_of_days = req.body.no_of_days;
    packages.AllowedPersons = req.body.AllowedPersons;
    packages.Location = req.body.Location;
    packages.Status = req.body.Status;
    packages.Images = imgPath;
    packages.Ratings = 0;
    let data = await packages.save();
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  res.send("success");
});
module.exports = router;
