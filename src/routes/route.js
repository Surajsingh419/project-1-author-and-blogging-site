const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
//const userModel= require("../models/userModel.js")
const ProductController= require("../controllers/productController")
const OrderController= require("../controllers/orderController")

const middlewareGlobal=require('../middlewares/globalMiddleware.js')
const captureInfo1=middlewareGlobal.captureInfoUO
const captureInfo2=middlewareGlobal.captureInfoO
router.post('/createProduct',  ProductController.createProduct);
router.post('/createUser',captureInfo1,  UserController.createUser);
router.post('/createOrder', captureInfo2, OrderController.createOrder);
//router.get('/getauthors',  authorController.getAuthor);

module.exports = router;