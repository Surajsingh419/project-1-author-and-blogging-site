const mongoose=require('mongoose')
/*{ fname: { mandatory}, lname: {mandatory}, title:
{mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory,
valid email, unique}, password: {mandatory} }*/
const authorSchema=new mongoose.Schema(
   {

    "fname" :
             {
              type:String,
              require:true   
             },
    "lname": 
          {
                type:String,
                require:true   
           },
    "title": 
            {
              type:String, 
              enum: ["Mr", "Mrs", "Miss"],
              require:true   
            },

    "email":
            {
                  type:String, 
                  require:true,
                  unique:true   
            },
    "password":
            {
                  type:String, 
                  require:true,
                 
            }
        
    },

{timestamps: true} 

)

module.exports = mongoose.model('authorModel_29.11.2021',authorSchema )
