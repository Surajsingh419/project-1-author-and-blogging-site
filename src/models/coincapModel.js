const mongoose=require('mongoose')

const coincapSchema=new mongoose.Schema(
   {

    "symbol" :
             {
              type:String,
              unique:true   
             },
    "name": 
          {
                type:String,
                unique:true   
           },
    "marketCapUsd": String,  
    "priceUsd":String
        
    },

{timestamps: false} 

)

module.exports = mongoose.model('coincap_26.11.2021',coincapSchema )
