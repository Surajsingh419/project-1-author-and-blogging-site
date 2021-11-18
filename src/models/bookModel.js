const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema(
    {

        name:String,
        author:
              {
                  type:ObjectId,
                  ref:'myAuthor_18.11.2021'
              },
        price:Number,
        ratings:Number,
        publisher:
                {
                    type:ObjectId,
                    ref:'myPublisher_18.11.2021'
                },
    }, 
{timestamps: true} )
module.exports = mongoose.model( 'myBook_18.11.2021', bookSchema ) 

