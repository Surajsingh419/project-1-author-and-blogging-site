const mongoose = require('mongoose')
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")

const createBlog = async function (req, res) {
    const blogData = req.body;
    if (validId) {

        if (blogData.isPublished == true) {
            blogData["publishedAt"] = new Date()
        }
        const Id = req.body.authorId
        const validId = await authorModel.findById(Id)
        if (validId) {

            const newBlog = await blogModel.create(blogData)
            res.status(201).send({ status: true, msg: 'New blog created successfully', data: newBlog })
        }
        else {
            res.status(400).send({ status: false, msg: 'Invalid Request' })
        }
    }
}

const getBlog = async function (req, res) {
    try {
        const blogData = await blogModel.find({ isDeleted: false, isPublished: true })
        if (blogData) {
            res.status(200).send({ status: true, data: blogData })
        }
        else {
            res.status(404).send({ status: false, msg: "No documents found!" })
        }
    }
    catch (err) {

        res.status(500).send({ msg: "Some error occured" });
    }
}


const getFilterBlog=async function(req,res)
{
  
 try 
 {
  
    let authorId = req.query.authorId
    let tags = req.query.tags
    let category = req.query.category
    let subcategory = req.query.subcategory

    obj={}
    if(authorId)
    {
        obj.authorId=authorId
    }
    if(tags)
    {
        obj.tags=tags
    }
    if(category)
    {
        obj.category=category
    }
    if(subcategory)
    {
        obj.subcategory=subcategory
    }
    console.log(obj)
    obj.isDeleted=false
    obj.isPublished=true
    let data=await blogModel.find(obj)
    if(!data)
    {
        return res.status(404).send({status:false,msg:"The given data is invalid!"})
    }
    else
    {
        res.status(201).send({status:true,data:data})
    }

}
catch (err) 
{

    res.status(500).send({ msg: "Some error occured" });
}
    
}


const updateBlog = async function (req, res) {
    let blogid = req.params.blogId;
    let updatedBlogdata = req.body
    let updatedTitle = req.body.title;
    let updatedBody = req.body.body;
    let addTags = req.body.tags;
    let addSubcategory = req.body.subcategory;
    let newispublished = req.body.isPublished;
    let newisdeleted = req.body.isDeleted

    let validBlog = await blogModel.findById(blogid)
    if (validBlog) {

        if (newispublished == true) {
            updatedBlogdata.publishedAt = new Date()
            abx = updatedBlogdata.publishedAt
        }

        let newBlog = await blogModel.findOneAndUpdate({ _id: blogid, isDeleted: false }, { title: updatedTitle, body: updatedBody, publishedAt: abx, $push: { subcategory: addSubcategory, tags: addTags } },
            { new: true })

        res.status(200).send({ status: true, data: newBlog })
    } else {
        res.status(500).send({ msg: "Some error occured" });
    }
}

const deleteBlogbyId = async function(req,res){

    let blogId = req.params.blogId
    let deletedBlog = await blogModel.findOneAndUpdate({_id:blogId, isDeleted:false},{isDeleted:true} )
    if(deletedBlog){
        res.status(200).send({msg : "Deleted" })
    } else {
        res.status(200).send({msg : "Invalid Blog ID"})
    }

}

const deleteBlog = async function (req, res) {
    try {
        let authorId = req.query.authorId
        let category = req.query.category
        let subcategory = req.query.subcategory
        let tags = req.query.tags
        let unpublished = req.query.unpublished
        let deletedblog = await blogModel.findOneAndUpdate({ authorId: authorId, category: category, subcategory: subcategory, tags: tags, unpublished: unpublished },
        {isDeleted: true}, { new: true })
        if (deletedblog) {
            res.status(500).send({ msg: "data is deleted" });
        } else {
            res.status(500).send({ msg: "data is not deleted" });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}







module.exports.createBlog = createBlog
module.exports.getBlog = getBlog
module.exports.getFilterBlog = getFilterBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlogbyId = deleteBlogbyId
module.exports.deleteBlog = deleteBlog