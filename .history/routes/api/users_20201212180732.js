const express = require("express");
let router = express.Router();
let { User } = require("../../models/users");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  let dataToReturn = {
    name: user.name,
    email: user.email,
    token: user.token,
  };
  // return res.send(_.pick(user, ["name", "email"]));
  return res.send(dataToReturn);
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});
/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let users = await User.find().skip(0).limit(20);
  res.contentType("json");
  console.log(users);
  return res.send(users);
});

/* GET single hotel . */

router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send("User with given ID is not present ");
    return res.send(user);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
module.exports = router;
