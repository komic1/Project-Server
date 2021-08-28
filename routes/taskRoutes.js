const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();
const taskController = require("../controllers/taskController");
const catController = require("../controllers/categoryController");

router.post(
  "/create-category",
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  catController.createCategory
);
router.put("/edit-category/:id", catController.editCategory);
router.post(
  "/create-task",
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  taskController.createTask
);
router.put("/edit-task/:id", taskController.editTask);
router.delete("/delete-category/:id", catController.deleteCategory);
router.delete("/delete-task/:id", taskController.deleteTask);
router.get("/getTasks", taskController.getTasks);
router.get("/getCategories", catController.getCategories);
router.put('/edit-task-category/:id',taskController.editTaskCategory);

module.exports = router;
