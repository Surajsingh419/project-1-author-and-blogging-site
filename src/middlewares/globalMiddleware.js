let captureInfoUO = function (req, res, next) {

  let FreeApp = req.headers['isfreeapp'];
  // let FreeApp=req.headers;
  // console.log(FreeApp)
  if (!FreeApp) {
    res.send({ msg: "The request is missing a mandatory header" });

  }
  else {

    next();
  }
}

const userModel = require("../models/userModel.js");
const productModel = require("../models/productModel.js")
const orderModel = require("../models/orderModel.js")
const ProductController= require("../controllers/productController")
let captureInfoO = async function (req, res, next) {

  let FreeApp = req.headers['isfreeapp'];

  if (!FreeApp) {
    res.send({ msg: "The request is missing a mandatory header" });

  }
  
else 
{
  
    let userId = req.body.userId;
    let productId = req.body.productId;
   let userFromRequest = await userModel.findById(userId);
    let userBalance=userFromRequest.balance;
    
    let productFromRequest = await productModel.findById(productId);
    let priceFromRequest=productFromRequest.price;
   
    let userUpdatedBalance=(userBalance-priceFromRequest);
  
    if (userFromRequest) 
    {
      if (productFromRequest) 
      {
        next();
        await  orderModel.findOneAndUpdate({isFreeAppUser: true },{amount:0},{ $set: {isFreeAppUser: true }});
        await  orderModel.findOneAndUpdate({isFreeAppUser: false},{amount:priceFromRequest},{ $set: {isFreeAppUser: false }});
        await  userModel.findOneAndUpdate({balance:userUpdatedBalance});
      }
      else 
      {
        res.send({ msg: "Check the Product Id!" });
      }
    }
    else 
    {
      res.send({ msg: "Check the User Id!" });
    }
  
  
  }
}

module.exports.captureInfoUO = captureInfoUO
module.exports.captureInfoO = captureInfoO