var express = require("express");
let router = express.Router();
const validateGuide = require("../../middlewares/validateGuide");
var { Guide } = require("../../models/Guide");
const multer = require("multer");
const { request } = require("../../app");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
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


router.get("/", async (req, res) => {
  let guides = await Guide.find().skip(0).limit(20);
  res.contentType("json");
  console.log(guides);
  return res.send(guides);
});


/* GET tours listing. 
router.get("/", async (req, res) => {
  let guides = await Guide.findAll()
    console.log(guides)
  return res.send(guides);
});
*/

router.get("/unapproved", async (req, res) => {
  console.log("adssd")
  //res.send(["Pen", "Pencil"]);
  // let page = Number(req.query.page ? req.quer y.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  //let tours = await Tour.find().skip(skipRecords).limit(perPage);
  let guides = await Guide.find({Status:false})
    
  return res.send(guides);
});

/* GET single guide . */
router.get("/:id", async (req, res) => {
  try {
    let guides = await Guide.findById(req.params.id);
    if (!guides)
      return res.status(400).send("Guide with given ID is not present ");
    return res.send(guides);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

/* Update Record */
router.put("/:id", validateGuide, async (req, res) => {
  let guide = await Guide.findById(req.params.id);
  guide.GuideName = req.body.GuideName;
  guide.Description = req.body.Description;
  guide.Images = req.file.path;
  guide.Guide_Id = req.body.Guide_Id;
  guide.Status = req.body.Status;
  guide.Details = req.body.Details;
  guide.Cost = req.body.Cost;
  guide.Experience = req.body.Experience;
  guide.Visted_Places = req.body.Visted_Places;
  guide.Languages = req.body.Languages;
  await guide.save();
  return res.send(guide);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let guide = await Guide.findByIdAndDelete(req.params.id);
  return res.send(guide);
});



router.post("/", async (req, res) => {
  //console.log(req.file);
  console.log(req.body);

  let guide = new Guide();
  guide.GuideName = req.body.GuideName;
  guide.Description = req.body.Description;
  //guide.Images = req.file.path;
  guide.Guide_Id = req.body.Guide_Id;
  guide.Status = req.body.Status;
  guide.Details = req.body.Details;
  guide.Cost = req.body.Cost;
  guide.Experience = req.body.Experience;
  guide.Visted_Places = req.body.Visted_Places;
  guide.Languages = req.body.Languages;
  await guide.save();
  return res.send(guide);
});



module.exports = router;