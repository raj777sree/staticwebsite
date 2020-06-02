const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const blogRoutes = require("./routes/blog");
mongoose
  .connect("mongodb://localhost:27017/Blogger", { useFindAndModify: false })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("not connected" + err);
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(require("cors")());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

  app.use("/api/blog", blogRoutes);

  module.exports = app;
