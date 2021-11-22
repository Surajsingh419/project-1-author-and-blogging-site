const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
    name:String,
       
    balance:
        {
            type:Number,
            require:true,
            default:100
        },
    address:String,
    age:Number,
    gender:{type: String, enum: ['male', 'female', 'other']},

    freeAppUser: 
         {
             type:Boolean,
             default:false
         }
    },

{timestamps: true} 

)

module.exports = mongoose.model( 'User_22.11.2021',userSchema )
