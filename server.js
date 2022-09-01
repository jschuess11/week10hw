const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const attractionsRouter = require("./backend/Routes/attractions");
const contactRouter = require("./backend/routes/contact");

app.use("/attractions", attractionsRouter);
app.use("/contact", contactRouter);

app.use(express.static(path.join(__dirname, "./build")));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});