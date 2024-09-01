const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: false,
  },
  category: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    require: false,
  },
  size: [{ type: String }],
  color: [{ type: String }],
});

exports.Product = new mongoose.model("Product", productSchema);
