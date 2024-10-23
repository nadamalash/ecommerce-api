//Business logic of category that will use in handler
const { CategoryModel } = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc Get Categories
// @route GET /api/v1/category
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc Get Specific Category By ID
// @route GET /api/v1/category/:id
// @access Public
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category)
    res.status(404).json({ msg: `no category found for this id ${id}` });
  res.status(200).json({ data: category });
});

// @desc Create Category
// @route POST /api/v1/category
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc Update Specific Category
// @route PUT /api/v1/category/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category)
    res.status(404).json({ msg: `no category found for this id ${id}` });
  res.status(200).json({ data: category });
});

// @desc Delete Specific Category
// @route DELETE /api/v1/category/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category)
    res.status(404).json({ msg: `no category found for this id ${id}` });
  res.status(204).json();
});
