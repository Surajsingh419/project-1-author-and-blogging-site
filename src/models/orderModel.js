const mongoose=require('mongoose');
const moment=require('moment');
// const isoDate=require('isodate')
// const today=new Date().toISOString();
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema=new mongoose.Schema(
    {
        userId: 
              {
                  type:ObjectId,
                  ref:"User_22.11.2021"
              },
        productId:
                {
                    type:ObjectId,
                    ref:"Product_22.11.2021"
                },
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














