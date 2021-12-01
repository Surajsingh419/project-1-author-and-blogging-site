const jwt = require('jsonwebtoken');
let tokenCheck = function (req, res, next) {
  try {
    let token = req.headers['x-api-key']

    if (token) {
      let validToken = jwt.verify(token, 'Helium')
      if (validToken) {
        req.validToken1 = validToken;
        next();
      }
      else {
        res.status(401).send({ status: false, message: 'Token not valid!' })
      }
    }
    else {
      res.status(401).send({ status: false, message: 'Mandatory header is missing!' })
    }
  }
  catch (error) {
    res.status(500).send({ message: "Failed", error: error.message });
  }
}


module.exports.tokenCheck = tokenCheck