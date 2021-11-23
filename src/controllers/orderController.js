// const orderModel= require("../models/orderModel.js")

// const createOrder= async function (req, res) 
// {
//     var data= req.body
//     let savedData= await orderModel.create(data)
//     res.send({msg: savedData})    
// }
// module.exports.createOrder= createOrder

const userModel = require("../models/userModel.js");
const productModel = require("../models/productModel.js")
const orderModel = require("../models/orderModel.js")

let  createOrder = async function (req, res, next) 
{
  
    let userId = req.body.userId;
    let productId = req.body.productId;
    let appTypeFree = req.isFreeAppUser//This attribute was set in the appMiddleware
   let userFromRequest = await userModel.findById(userId);
    let userBalance=userFromRequest.balance;
    
    let productFromRequest = await productModel.findById(productId);
    let productPrice=productFromRequest.price;
   
    let userUpdatedBalance=(userBalance-productPrice);
    // user validation
    if (!userFromRequest) 
    {
        res.send({ msg: "User doesn't exist. Please provide a valid userId" });
    }
     //product validation
    if (!productFromRequest) 
    {
        res.send({ msg: "Product doesn't exist. Please provide a valid productId" });
    }
    // await  orderModel.findOneAndUpdate({isFreeAppUser: true },{amount:0},{ $set: {isFreeAppUser: true }}); 
    //  await  orderModel.findOneAndUpdate({isFreeAppUser: false},{amount:priceFromRequest},{ $set: {isFreeAppUser: false }});
    //  await  userModel.findOneAndUpdate({balance:userUpdatedBalance});

     //user balance validation
    if(!appTypeFree && userBalance < productPrice) 
    {
        return res.send({message: "User doesn't have enough balance to purchase the product"})
    }
  
    if(appTypeFree) 
    {
        amount = 0
    } else //paid app
    {
        
        amount =productPrice
    }
    let orderDetails = 
    {
        userId: userId,
        productId: productId,
        amount: amount,
        isFreeAppUser: appTypeFree, 
    }
    let orderCreated = await orderModel.create(orderDetails)
    
   if(!appTypeFree) 
   {
       await userModel.findOneAndUpdate({_id: userId}, {balance: userUpdatedBalance})
   }

   res.send({data: orderCreated})
} 
module.exports.createOrder= createOrder
