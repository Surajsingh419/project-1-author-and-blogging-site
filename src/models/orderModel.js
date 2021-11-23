const mongoose=require('mongoose');
const moment=require('moment');
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema=new mongoose.Schema(
    {
        userId: ObjectId,
        productId:ObjectId,
        amount:Number,
        isFreeAppUser:Boolean,
        date:
            {
                type:Date,
                default:moment().format('L')
            }
           
    },

{timestamps: true} 

)



module.exports = mongoose.model('Order_22.11.2021',orderSchema)














