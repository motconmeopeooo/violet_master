const express = require("express");

const { Product } = require("../model/product");
const router = express.Router();
require("dotenv").config();

//Get all
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const search = req.query.search || "";
  const category = req.query.category || "";
  const sortBy = req.query.sortBy || "name";
  const sort = +req.query.sort || -1;
  const sortObj = {};
  sortObj[sortBy] = sort;
  Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } }, // Case-insensitive search on 'title' field
      { description: { $regex: search, $options: "i" } }, // Case-insensitive search on 'content' field
    ],
  })
    .sort(sortObj)
    .then((post) => res.send(post))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/random", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const random = Math.floor(Math.random() * 10);

  Product.find()
    .limit(8)
    .skip(random)
    .then((post) => res.send(post))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const post = await Product.findById(req.params.id);
  if (!post) res.status(404).send("Not found");
  else res.send(post);
});

module.exports = router;
