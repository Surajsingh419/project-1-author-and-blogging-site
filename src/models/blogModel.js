/*{ title: {mandatory}, body: {mandatory}, authorId:
{mandatory, refs to author model}, tags: {array of
string}, category: {string, mandatory, examples:
[technology, entertainment, life style, food, fashion]},
subcategory: {array of string, examples[technology-[web
development, mobile development, AI, ML etc]] },
createdAt, updatedAt, deletedAt: {when the document is
deleted}, isDeleted: {boolean, default: false},
publishedAt: {when the blog is published}, isPublished:
{boolean, default: false}}*/
const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId;
const blogSchema=new mongoose.Schema(
   {

    "title" :
             {
              type:String,
              require:true   
             },
    "body": 
          {
                type:String,
                require:true   
           },
    "authorId": 
            {
              type:ObjectId, 
              ref: 'authorModel_29.11.2021',
              require:true   
            },

    "tags:":[String] ,
    "category": 
            {
                type:[String],
                require:true   
            },
    "subcategory":[String] ,
    "timestamps": 
                { 
                    createdAt: 'created_at' ,
                    updatedAt:'updated_at',
                    deletedAt:'deleted_at'
                },
    "isDeleted":
            {
                type:Boolean,
                default:false

            },
    "publishedAt":
            {
                timestamps: true

            },
    "isPublished":
            {
                type:Boolean,
                default:false

            }
            

            
    },

{} 

)

module.exports = mongoose.model('blogModel_29.11.2021',blogSchema )
