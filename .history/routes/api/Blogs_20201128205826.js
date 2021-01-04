var express = require("express");
const validateBlog = require("../../middlewares/validateBlog");
let router = express.Router();
var { Blog } = require("../../models/blogs");
const { request, response } = require("../../app");
const validateBlogCategory = require("../../middlewares/validateBlogCategory");



/* GET blogs list */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  
  //.skip(skipRecords).limit(perPage)
  let blogs = await Blog.find().skip(0).limit(perPage);
  res.contentType('json');
  console.log(blogs);
  return res.send(blogs);
});

/* GET single blog . */


router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
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
router.put("/:id", validateBlog, async (req, res) => {
  let blogs = await Blog.findById(req.params.id);
    blogs.Title = req.body.Title;
    blogs.Link = req.body.Link;
    blogs.Description = req.body.Description;
    blogs.Date = req.body.Date;
    //blogs.Date = fs.readFileSync(req.file.path);
  await blogs.save();
  return res.send(blogs);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let blogs = await Blog.findByIdAndDelete(req.params.id);
  return res.send("Blog has been Successfully Deleted");
});
// upload.single("Images"),

router.post("/",  async (req, res) => {
  try {
    const blogs = new Blog();
        // console.log(req.file);
    // console.log(req.body);
    blogs.Title = req.body.Title;
    blogs.Link = req.body.Link;
    blogs.Description = req.body.Description;
    blogs.Date = req.body.Date;
    await blogs.save();
    // return res.send(hotel);
    return res.send("data");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  //res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
});
module.exports = router;