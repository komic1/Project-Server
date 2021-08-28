const express = require('express');
const catController = require('../controllers/categoryController');

const router = express.Router();

router.post('/create-category',catController.createCategory);
router.get('/all-categories',catController.getCategories);
router.delete('/delete-category/:id',catController.deleteCategory);

module.exports = router;