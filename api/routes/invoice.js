const express = require("express");

const { Invoice } = require("../model/invoice");
const router = express.Router();
require("dotenv").config();

//Get all
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  Invoice.find()
    .sort({ createAt: -1 })
    .then((post) => res.send(post))
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const post = await Invoice.findById(req.params.id);
  if (!post) res.status(404).send("Not found");
  else res.send(post);
});

router.post("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  invoice = new Invoice({
    total: req.body.total,
    products: req.body.products,
    createAt: new Date().toString(),
    status: "Processing",
    address: req.body.address,
    phone: req.body.phone,
  });
  invoice
    .save()
    .then((invoice) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
});

module.exports = router;
