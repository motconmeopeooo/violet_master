const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
  total: {
    type: Number,
    require: true,
  },
  products: [{ type: Object, require: true }],
  createAt: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
  phone: {
    type: String,
    require: false,
  },
});

exports.Invoice = new mongoose.model("Invoice", invoiceSchema);
