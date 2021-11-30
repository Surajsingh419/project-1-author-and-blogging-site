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



    const getFilterBlog = async function (req, res) {
        try {
            
            // const category=req.query.category
            // const tag=req.query.tag
            // const subcategory=req.query.subcategory
            // ,category:category,tag:tag,subcategory:subcategory
            const blogData = await blogModel.find({ isDeleted: false, isPublished: true })
            if (blogData) {
                const authorId = req.query.authorid
                const category=req.query.category
                const tag=req.query.tag
                const subcategory=req.query.subcategory
               
                const blogData1 = await blogModel.find($or[{ authorId: authorId },{tags:tag}][{ authorId: authorId },{category:category}])
                if (blogData1) {
                    
                    res.status(200).send({ status: true, data: blogData1 })
                }
                else {
                    res.status(404).send({ status: false, msg: "No documents found!" })
                }
            }
            else {
                res.status(404).send({ status: false, msg: "The data is deleted or not published!" })
            }
        }

        catch (err) {
            res.status(500).send({ msg: "Some error occured" });
        }
    };
 
 const updateBlog = async function(req,res){
     let blogid=req.params.blogId;
     let updatedBlogdata=req.body
     let updatedTitle=req.body.title;
     let updatedBody=req.body.body;
     let addTags=req.body.tags;
     let addSubcategory=req.body.subcategory;
     let newispublished=req.body.isPublished;
     let newisdeleted=req.body.isDeleted
     
     let validBlog=await blogModel.findById(blogid) 
     if(validBlog){
         
        if (newispublished == true) {
            updatedBlogdata.publishedAt = new Date()
            abx=updatedBlogdata.publishedAt
        }
      
             let newBlog= await blogModel.findOneAndUpdate({_id:blogid,isDeleted:false},{title:updatedTitle,body:updatedBody,publishedAt:abx, $push:{subcategory: addSubcategory,tags:addTags}}, 
                 {new:true})
               
                res.status(200).send({ status: true, data: newBlog })
     }else{
        res.status(500).send({ msg: "Some error occured" });
     }
 }






    module.exports.createBlog = createBlog
    module.exports.getBlog = getBlog
    module.exports.getFilterBlog = getFilterBlog 
    module.exports.updateBlog = updateBlog 