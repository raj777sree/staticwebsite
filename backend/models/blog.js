const mongoose = require("mongoose");

const blogData = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  AddDate: { type: Date, default: Date.now },
  Update: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogData);
