const userModel= require("../models/userModel.js")

const createUser= async function (req, res) 
{
    var data= req.body
    let savedData= await userModel.create(data)
      res.send({msg: savedData})    
}

/*const getUser = async function (req, res) 
{
  let allBooks = await authorModel.find();
  res.send({ msg: allBooks });
}*/

module.exports.createUser= createUser
//module.exports.getAuthor= getAuthor