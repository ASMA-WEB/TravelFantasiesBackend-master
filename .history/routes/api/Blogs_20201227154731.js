var express = require("express");
//const validateBlog = require("../../middlewares/validateBlog");
let router = express.Router();
const multer = require("multer");
var { Blog } = require("../../models/blogs");
const { request, response } = require("../../app");
const validateBlogCategory = require("../../middlewares/validateBlogCategory");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "C:/Users/DeLL/Documents/GitHub/TravelFantasies/public/images/blogs"
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

/* GET blogs list */
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 30);
  let skipRecords = perPage * (page - 1);
  let blogs = await Blog.find().skip(skipRecords).limit(perPage);
  //res.contentType('json');
  //console.log(blogs);
  return res.send(blogs);
});

/* GET single blog . */
router.get("/:id", async (req, res) => {
  try {
    let blogs = await Blog.findById(req.params.id);
    if (!blogs)
      return res.status(400).send("Blog with given ID is not present ");
    return res.send(blogs);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", upload.single("file"), async (req, res) => {
  let blogs = await Blog.findById(req.params.id);
  blogs.Title = req.body.Title;
  blogs.Description = req.body.Description;
  blogs.Date = req.body.Date;
  blogs.Image.data = fs.readFileSync(req.file.path);
  blogs.Image.contentType = req.file.mimetype;

  //blogs.Date = fs.readFileSync(req.file.path);
  await blogs.save();
  return res.send(blogs);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let blogs = await Blog.findByIdAndDelete(req.params.id);
  return res.send("Blog has been Successfully Deleted");
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const blogs = new Blog();
    blogs.Title = req.body.Title;
    blogs.Description = req.body.Description;
    blogs.Category = req.body.Category;
    blogs.Date = req.body.Date;
    blogs.Image.data = fs.readFileSync(req.file.path);
    blogs.Image.contentType = req.file.mimetype;
    await blogs.save();
    return res.send(blogs);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
module.exports = router;
