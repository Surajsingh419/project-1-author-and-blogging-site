const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) 
{
    var data= req.body
    const verifyEmail=req.body.email
    const regx=(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(regx.test(verifyEmail))
    {
        let savedData= await authorModel.create(data)
         res.send({msg: savedData})  
        
    }
    else
    {
        res.send({msg:"Invalid email!"});
    }
      
}
module.exports.createAuthor= createAuthor