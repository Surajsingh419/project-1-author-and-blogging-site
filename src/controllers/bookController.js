const bookModel = require("../models/bookModel.js");
const mongoose = require("mongoose");
const authorModel = require("../models/authorModel.js");
const ObjectId = mongoose.Schema.Types.ObjectId

const createBook = async function (req, res) {

  const book = req.body;
  let id=req.body.author;
  let authorFromRequest=await authorModel.findById(id);
  if(authorFromRequest)
  {
  let savedBook = await bookModel.create(book);
  res.send({ msg: savedBook });
  }
  else
  {
    res.send({msg:"Check the Author Id!It's not valid"});
  }

}

const getBooks = async function (req, res) 
{
  let allBooks = await bookModel.find().populate('author');//we have to give the key value
  res.send({ msg: allBooks });
}



module.exports.createBook = createBook;
module.exports.getBooks = getBooks;


