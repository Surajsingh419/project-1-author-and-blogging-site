const mongoose = require('mongoose')
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const jwt = require('jsonwebtoken');
//------------------------1.Create Blog---------------------------------------------------------
const createBlog = async function (req, res) {
    try {
        const blogData = req.body;
        if (req.body.title && req.body.body && req.body.tags && req.body.subcategory && req.body.authorId) {
            if (blogData) {

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
                    res.status(400).send({ status: false, msg: "No blog with this author Id" })
                }


            }
        }
        else {
            res.status(400).send({ status: false, msg: "Mandatory body missing" })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }

}
//------------------------2.Filter Blog---------------------------------------------------------
const getFilterBlog = async function (req, res) {
    try {

        if (req.query.category || req.query.authorId || req.query.tags || req.query.subcategory) {
            let authorId = req.query.authorId
            let tags = req.query.tags
            let category = req.query.category
            let subcategory = req.query.subcategory

            obj = {}
            if (authorId) {
                obj.authorId = authorId
            }
            if (tags) {
                obj.tags = tags
            }
            if (category) {
                obj.category = category
            }
            if (subcategory) {
                obj.subcategory = subcategory
            }

            obj.isDeleted = false
            obj.isPublished = true

            let data = await blogModel.find(obj)
            if (!data) {
                return res.status(404).send({ status: false, msg: "The given data is invalid!" })
            }
            else {
                res.status(201).send({ status: true, data: data })
            }

        }
        else {
            return res.status(404).send({ status: false, msg: "Mandatory body not given" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }

}

//------------------------3.Update Blog---------------------------------------------------------
const updateBlog = async function (req, res) {
    let blogid = req.params.blogId;
    let updatedBlogdata = req.body
    let updatedTitle = req.body.title;
    let updatedBody = req.body.body;
    let addTags = req.body.tags;
    let addSubcategory = req.body.subcategory;
    let newispublished = req.body.isPublished;

    try {

        let validBlog = await blogModel.findById(blogid)
        let abx;

        if (validBlog) {
            if (req.validToken1.authorId == validBlog.authorId) {

                if (newispublished == true) {
                    updatedBlogdata.publishedAt = new Date()
                    abx = updatedBlogdata.publishedAt

                }

                let newBlog = await blogModel.findOneAndUpdate({ _id: blogid, isDeleted: false }, { title: updatedTitle, body: updatedBody, publishedAt: abx, isPublished: newispublished, $push: { subcategory: addSubcategory, tags: addTags } },
                    { new: true })

                res.status(200).send({ status: true, data: newBlog })
            }
            else {
                res.status(401).send({ status: false, msg: "Not Authorize" })
            }
        }
        else {
            res.status(404).send({ status: false, msg: "Blog Id is wrong!" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}
//------------------------4.Delete Blog By Id---------------------------------------------------------
const deleteBlogbyId = async function (req, res) {
    try {
        if (req.validToken1.authorId == req.query.authorId) {
            let blogId = req.params.blogId



            let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() })
            if (deletedBlog) {

                res.status(200).send({ status: true, msg: "Deleted" })
            }
            else {
                res.status(200).send({ status: false, msg: "Document not found!" })
            }

        }
        else {

            res.status(401).send({ status: false, msg: "Not Authorize" })
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}
//--------------------------5.Delete Blog---------------------------------------------------------
const deleteBlog = async function (req, res) {
    try {
        if (req.query.category || req.query.authorId || req.query.tags || req.query.subcategory) {
            if (req.validToken1.authorId == req.query.authorId) {
                let obj = {};
                if (req.query.category) {
                    obj.category = req.query.category
                }
                if (req.query.authorId) {
                    obj.authorId = req.query.authorId;
                }
                if (req.query.tags) {
                    obj.tags = req.query.tags
                }
                if (req.query.subcategory) {
                    obj.subcategory = req.query.subcategory
                }
                if (req.query.published) {
                    obj.isPublished = req.query.isPublished
                }
                let data = await blogModel.findOne(obj);
                if (!data) {
                    return res.status(404).send({ status: false, msg: "The given data is Invalid" });
                }
                data.isDeleted = true;
                data.deletedAt = new Date();
                data.save();
                res.status(200).send({ msg: "succesful", data: data });
            }
            else {
                res.status(401).send({ status: false, msg: "Not Authorize" })
            }
        }
        else {
            return res.status(404).send({ status: false, msg: "Mandatory body missing!" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Failed", error: error.message });
    }
}
//--------------------------6.Login check---------------------------------------------------------
const loginAuthor = async function (req, res) {

    let email = req.body.email;
    let psw = req.body.password;
    if (email && psw) {
        const authorDetails = await authorModel.findOne({ email: email, password: psw, isDeleted: false });

        if (authorDetails) {
            token = jwt.sign({ authorId: authorDetails._id }, "Helium")//token generation
            res.header('x-api-key', token)//add new header to my response
            res.send({ status: true, data: authorDetails, Token: token });
        }
        else {
            res.send({ status: false, msg: "Invalid credentials!" });
        }
    }
    else {
        res.status(400).send({ status: false, message: "Request body must contain Email and Password" })
    }
}


module.exports = { createBlog, getFilterBlog, updateBlog, deleteBlogbyId, deleteBlog, loginAuthor }

