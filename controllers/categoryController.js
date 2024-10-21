//Business logic of category that will use in handler
const { CategoryModel } = require("../models/categoryModel");

exports.addCategory = (req, res) => {
  const name = req.body.name;

  const newCategory = new CategoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
};
