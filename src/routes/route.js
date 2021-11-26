const express = require('express');
const router = express.Router();


const coinController= require("../controllers/coincapController")


router.get('/getCryptoCoin',  coinController.getCoin);

module.exports = router;