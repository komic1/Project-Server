const Category = require('../models/category');
const Task = require('../models/task');

exports.createCategory = (req,res,next) => {
    const title = req.body.title;
    //const userId = req.user._id;
  
    const category = new Category({
      title: title,
      //userId: userId,
    });
  
    category
      .save()
      .then((cat) => {
        res.json({
          message: "Succesfully added to database",
          cat: cat,
        });
      })
      .catch((err) => err);
}

exports.editCategory = (req,res,next) => {
    const catId = req.params.id;

    const newTitle = req.body.title;
  
    Category.findById(catId)
      .then((cat) => {
        cat.title = newTitle;
        return cat.save();
      })
      .then((result) => {
        res.status(200).json({
          message: "Category has been updated successfully!",
          cat: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteCategory = (req,res,next) => {
    const catId = req.params.id;
    console.log("pokrenut sam");
    Category.findByIdAndRemove(catId)
      .then((result) => {
        return Task.deleteMany({
          categoryId : catId
        }).then(data => {
        res.status(200).json({
          message: "You have successfully deleted a category and it's tasks",
          cat: result
        })});
      })
      .catch((err) => console.log(err));
}

exports.getCategories = (req,res,next) => {
    Category.find()
    .populate('tasks')
    .then((categories) => {
      res.json({
        categories: categories
      });
    })
    .catch((err) => console.log(err));
}