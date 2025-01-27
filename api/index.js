const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("trust proxy", true);
//import route
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const invoiceRouter = require("./routes/invoice");

//Create database
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Success connected database");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

//Use route
app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/invoice", invoiceRouter);

app.get("/", (req, res) => {
  res.send(
    "Chin chào !! This is api design and coding by Nguyên :3 .If you see this message. Have a good day moaz moaz :3"
  );
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Starting server");
});
