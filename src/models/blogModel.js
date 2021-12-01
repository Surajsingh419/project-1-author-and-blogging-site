const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const blogSchema = new mongoose.Schema(
        {

                "title":
                {
                        type: String,
                        require: true
                },
                "body":
                {
                        type: String,
                        require: true
                },
                "authorId":
                {
                        type: ObjectId,
                        ref: 'authorModel_29.11.2021',
                        require: true
                },

                "tags": [String],
                "category":
                {
                        type: String,
                        require: true
                },
                "subcategory": [String],
                "deletedAt": Date,
                "isDeleted":
                {
                        type: Boolean,
                        default: false

                },

                "publishedAt": Date,
                "isPublished":
                {
                        type: Boolean,
                        default: false

                }



        },

        { timestamps: true }


)

module.exports = mongoose.model('blogModel_29.11.2021', blogSchema)
