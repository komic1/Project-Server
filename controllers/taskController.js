const Task = require("../models/task");
const Category = require('../models/category');
const category = require("../models/category");

exports.createTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const categoryId = req.body.categoryId;

  const task = new Task({
    title: title,
    description: description,
    categoryId: categoryId,
  });



  task
    .save()
    .then((task) => {
      Category.findById(categoryId).then(cat=> {
          let tasks2 = cat.tasks;
          tasks2.push(task._id);
          cat.tasks = tasks2;
          cat.save();
    })
      res.json({
        message: "Succesfully added to database",
        task: task,
      });
    })
    .catch((err) => err);
};

exports.editTask = (req, res, next) => {
  const taskId = req.params.id;

  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const newcategoryId = req.body.categoryId;

  Task.findById(taskId)
    .then((task) => {
      task.title = newTitle;
      task.description = newDescription;
      task.categoryId = newcategoryId;
      return task.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Task has been updated successfully!",
        task: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.deleteTask = (req, res, next) => {
  const taskId = req.params.id;

  Task.findByIdAndRemove(taskId)
    .then((result) => {
      res.status(200).json({
        message: "You have successfully deleted a task",
        task: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getTasks = (req,res,next) => {
  Task.find().then(tasks => {
    return res.status(200).json({
      tasks : tasks,
      message : 'Tasks have been retrieved'
    })}).catch(err => {
      console.log(err)
    })
  }

  exports.editTaskCategory = (req,res,next) => {
    const taskId = req.params.id;
    const catId = req.body.catId;
    const sendingCatId = req.body.sendingCatId;


    Category.findById(sendingCatId)
    .then(category => {
      var index ;
      for( var i=0; i<category.tasks.length; i++){
        if(category.tasks[i]._id==taskId){
          index = i;
          console.log(index)
          break;
        }
      }
      category.tasks.splice(index,1);
      return category.save()
      }).then(res => {
        Task.findById(taskId)
        .then(task => {
          task.categoryId = catId;
          return task.save();
        })
      }).then(res => {
        Category.findById(catId)
        .then(category => {
        category.tasks.push(taskId)
        category.save();
      }).catch(err => console.log(err))
      })

      


  }
