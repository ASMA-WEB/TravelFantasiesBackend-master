var express = require("express");
let router = express.Router();
const validateUser = require("../../middlewares/validateUser");
var { User } = require("../../models/users");

router.post("/signup", async (req, res) => {
  let user = new User();
  user.Email = req.body.email;
  user.Name = req.body.name;
  user.Password = req.body.password;
  await user.save();
  return res.send(user);
});

router.post("/login", async (req, res) => {
  var user = await User.find({
    Email: req.body.email,
    Password: req.body.password,
    Role: req.body.role,
  });
  if (user.length < 1)
    return res.send("Invalid email and password").status(401);

  return res.send(user).status(200);
});

/* GET users listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);

  let users = await User.find().skip(skipRecords).limit(perPage);

  return res.send(users);
});

/* GET single user . */
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
/* Update Record */
router.put("/:id", validateUser, async (req, res) => {
  let user = await User.findById(req.params.id);
  user.Name = req.body.Name;
  user.Age = req.body.Age;
  user.CNIC = req.body.CNIC;
  user.Contact_no = req.body.Contact_no;
  user.Email = req.body.Email;
  user.Gender = req.body.Gender;
  user.Password = req.body.Password;
  await user.save();
  return res.send(user);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let user = await User.findByIdAndDelete(req.params.id);
  return res.send(user);
});

/* Insert Record */
router.post("/", validateUser, async (req, res) => {
  let user = new User();
  user.Name = req.body.Name;
  user.Age = req.body.Age;
  user.CNIC = req.body.CNIC;
  user.Contact_no = req.body.Contact_no;
  user.Email = req.body.Email;
  user.Gender = req.body.Gender;
  user.Password = req.body.Password;
  await user.save();
  return res.send(user);
});

module.exports = router;
