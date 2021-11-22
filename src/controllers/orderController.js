const orderModel= require("../models/orderModel.js")

const createOrder= async function (req, res) 
{
    var data= req.body
    let savedData= await orderModel.create(data)
    res.send({msg: savedData})    
}
module.exports.createOrder= createOrder