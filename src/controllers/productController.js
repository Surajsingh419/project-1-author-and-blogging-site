const userModel= require("../models/productModel.js")

const createProduct= async function (req, res) 
{
    var data= req.body
    let savedData= await userModel.create(data)
    res.send({msg: savedData})    
}
module.exports.createProduct= createProduct