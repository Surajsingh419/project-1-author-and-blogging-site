const publishModel= require("../models/publishModel.js")

const createPublisher= async function (req, res) 
{
    var data= req.body
    let savedData= await publishModel.create(data)
    res.send({msg: savedData})    
}

module.exports.createPublisher=createPublisher
