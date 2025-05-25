const jwt = require('jsonwebtoken')


exports.EncodedToken = (email, user_id) => {
   return jwt.sign({ email: email, id: user_id }, process.env.SECRET_KEY, { expiresIn: '7d' });
}


exports.decodedToken = (token) => {
   try {
      return jwt.verify(token, process.env.SECRET_KEY);
   } catch (error) {
      return null;
   }
}