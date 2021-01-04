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


// const params = {
//   '/single': 'file',
//   '/multiple': 'files'
// };

// function validate(req, res, next) {
//   let param = params[req.url];
//   if (!req[param]) {
//     return res.send({
//       errors: {
//         message: `${param} cant be empty`
//       }
//     });
//   }
//   next();
// }
/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let rooms = await Room.find().skip(0).limit(perPage);
  res.contentType('json');
  console.log(rooms);
  return res.send(rooms);
});

/* GET single hotel . */


router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let room = await Room.findById(req.params.id);
    if (!room)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(room);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateRoom, async (req, res) => {
  let room = await Room.findById(req.params.id);
   room.Category = req.body.Category;
    room.HotelId = req.body.HotelId;
    room.Image.data = fs.readFileSync(req.file.path);
    room.Image.contentType = req.file.mimetype;
    room.Description = req.body.Description;
    room.NumberOfRooms = req.body.NumberOfRooms;
    room.Cost = req.body.Cost;
    room.Facilities = req.body.Facilities;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let room = await Room.findByIdAndDelete(req.params.id);
  return res.send(room);
});
// upload.single("Images"),
/* Insert Record */
// validateHotel;

router.post("/", upload.single('file'), validateRoom, async (req, res) => {
    try {
    const room = new Room();
        // console.log(req.file);
    console.log(req.body);
    room.Category = "5f98751afcb2353908c13a87";
    room.HotelId = "5f8d570f9d9cda3e5c125353";
    room.Image.data = fs.readFileSync(req.file.path);
    room.Image.contentType = req.file.mimetype;
    room.Description = req.body.Description;
    room.NumberOfRooms = req.body.NumberOfRooms;
      room.Cost = req.body.Cost;
      room.AirConditioning = req.body.AirConditioning;
      room.BathTub = req.body.BathTub;
      room.FreeWifi = req.body.FreeWifi;
      room.HairDryer = req.body.HairDryer;
      room.InRoomIron = req.body.InRoomIron;
      room.PremiumCoffee = req.body.PremiumCoffee;
      room.RoomFridge = req.body.RoomFridge;
      room.RoomPurification = req.body.RoomPurification;
      room.Shower = req.body.Shower;
   room.Television=  req.body.Television
      room.TeaMaker = req.body.TeaMaker;
    // room.Facilities = req.body.Facilities;
    await room.save();
    // return res.send(hotel);
    return res.send("Room Saved in Hotel");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  //res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
});
module.exports = router;
