const jwt = require('jsonwebtoken')
const { decodedToken} = require('../helper/token')

exports.authVerify = (req, res, next) => {

  let token = req.headers['token']
  let decoded = decodedToken(token);
  
    if (decoded === null) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    } else {
       let email=decoded['email'];
        let id=decoded['id'];
        req.headers.email=email;
        req.headers.id=id;
        next();
    }
}