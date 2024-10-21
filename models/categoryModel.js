const mongoose = require("mongoose");
const { Schema } = mongoose;

// 1- Create Schema
const categorySchema = new Schema({
  name: String,
});

// 2- Create Model
exports.CategoryModel = mongoose.model("Category", categorySchema); //Doc name will be categories
