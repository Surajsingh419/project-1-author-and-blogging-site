const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel.js");
const publishModel= require("../models/publishModel.js")

const createBook = async function (req, res) {

  const book = req.body;
  let authorId=req.body.author;
  let publishId=req.body.publisher;
  let authorFromRequest=await authorModel.findById(authorId);
  //console.log(authorFromRequest._id);
  let publisherFromRequest=await publishModel.findById(publishId);
  if(authorFromRequest)
  {
    if(publisherFromRequest)
    {
       let savedBook = await bookModel.create(book);
      res.send({ msg: savedBook });
     }
    else
    {
    res.send({msg:"Check the Publisher Id!It's not valid"});
     }
  }
  else 
  {
    res.send({msg:"Check the Author Id!It's not valid"});
  }
  
}

const getBooks = async function (req, res) 
{
  let allBooks = await bookModel.find().populate('author',{ _id:1,author_name:1,age:1}).populate('publisher');//we have to give the key value
  res.send({ msg: allBooks });
}



module.exports.createBook = createBook;
module.exports.getBooks = getBooks;


