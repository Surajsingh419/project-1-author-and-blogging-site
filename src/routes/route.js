const express = require('express');
const router = express.Router();


const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")


router.post('/authors', authorController.createAuthor);
router.post('/blogs',blogController.createBlog);
router.get('/blogs',blogController.getBlog);
 router.get('/blogss',blogController.getFilterBlog);
router.put('/blogs/:blogId',blogController.updateBlog);
router.delete('/blogs/:blogId',blogController.deleteBlogbyId);
router.delete('/blogs/',blogController.deleteBlog)
module.exports = router;