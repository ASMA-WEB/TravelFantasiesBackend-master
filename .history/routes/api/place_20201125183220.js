var express = require("express");
let router = express.Router();
const validatePlace = require("../../middlewares/validatePlace");
var { Place } = require("../../models/places");

/* GET users listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 20);
  let skipRecords = perPage * (page - 1);
  let places = await Place.find().skip(skipRecords).limit(perPage);
  //let places = await Place.find();
  return res.send(places);
});

// /* GET single user . */
// router.get("/:id", async (req, res) => {
//   //res.send(["Pen", "Pencil"]);
//   try {
//     let user = await User.findById(req.params.id);
//     if (!user)
//       return res.status(400).send("User with given ID is not present ");
//     return res.send(user);
//   } catch (err) {
//     return res.status(400).send("Invalid ID");
//   }
// });
// /* Update Record */
// router.put("/:id", validateUser, async (req, res) => {
//   let user = await User.findById(req.params.id);
//   user.Name = req.body.Name;
//   user.Age = req.body.Age;
//   user.CNIC = req.body.CNIC;
//   user.Contact_no = req.body.Contact_no;
//   user.Email = req.body.Email;
//   user.Gender = req.body.Gender;
//   user.Password = req.body.Password;
//   await user.save();
//   return res.send(user);
// });

// /* Delete Record */
// router.delete("/:id", async (req, res) => {
//   let user = await User.findByIdAndDelete(req.params.id);
//   return res.send(user);
// });

/* Insert Record */
router.post("/", async (req, res) => {
  let place = new Place();
  place.Name = req.body.Name;
  place.Age = req.body.Age;
  place.CNIC = req.body.CNIC;
  place.Contact_no = req.body.Contact_no;
  place.Email = req.body.Email;
  place.Gender = req.body.Gender;
  place.Password = req.body.Password;
  await place.save();
  return res.send(place);
});
module.exports = router;
