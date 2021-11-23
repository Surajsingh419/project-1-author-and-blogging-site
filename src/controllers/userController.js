const userModel= require("../models/userModel.js")

const createUser= async function (req, res) 
{
  let userDetails = req.body
  userDetails.freeAppUser = req.isFreeAppUser//this attribute was set in req in the appMiddleware
  let userCreated = await userModel.create(userDetails)
  res.send({data: userCreated})
}

module.exports.createUser= createUser
