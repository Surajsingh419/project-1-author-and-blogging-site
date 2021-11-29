const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId

const authorModel= require("../models/authorModel")
const blogModel= require("../models/blogModel")


const createBlog = async function (req, res) {
    const Id = req.body.id

    const validId = await authorModel.findById(Id)

    const blogData = req.body;
    
     
    if (validId){
        const newBlog = await blogModel.create(blogData)
        res.status(201).send({status: true, msg: 'New blog created successfully', data: newBlog})
     }else {
        res.status(400).send({status: false, msg: 'Invalid Request'})
     }    
}



module.exports.createBlog= createBlog