const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")
const publishController= require("../controllers/publishController")


router.post('/authors',  authorController.createAuthor  );
router.post('/books',  BookController.createBook  );
router.get('/books',  BookController.getBooks  );
router.post('/publishers',publishController.createPublisher);


module.exports = router;