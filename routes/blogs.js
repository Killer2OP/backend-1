const express = require('express');
const { validatePagination } = require('../middleware/validation');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', validatePagination, blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/search', validatePagination, blogController.searchBlogs);
router.get('/categories', blogController.getCategories);
router.get('/:slug', blogController.getBlogBySlug);

module.exports = router;
