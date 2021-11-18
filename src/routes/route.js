const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")

router.post('/authors',  authorController.createAuthor  );
router.post('/books',  BookController.createBook  );
router.get('/books',  BookController.getBooks  );



module.exports = router;