const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helper/auth');


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length<6) { 
      return res.json({ error: "Password is required and password must be long 6 digit" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      token
    })




  } catch (error) {
    res.json({
      "success": false,
      "massage": `user ${error.massage}`
    })
  }
  
}





exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ success: false, error: "Enter a valid email address" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User does not exist" });
    }

    // Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    });

    // Send response
    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: `Login failed. ${error.message || "Unknown error"}`
    });
  }
};





exports.logout = async(req, res) => {
  try {
     // find  user -----
     let exists = await User.findById(req.headers.id);
    
     console.log(exists);
     //if don't exist then this massage ---- 
     if (!exists) {
       return res.json({
         "massage": "user does not exist",
         success: false,
       })
     }
     // user delete ------------------------------
     const userDelete = await User.findByIdAndDelete(req.headers.id, { projection: { _id:1,email:1}});
 
      res.status(200).json({
        success: true,
         message: "user logout successful",
         userDelete,
       })

 




  } catch (error) {
    res.json({
      "success": false,
      "massage": `user ${error.massage}`
    })
  }
  
}


exports.userProfileDetails = async (req, res) => {
  try {
    let userId = req.headers.id;
    // user find and get data -------------------------------------------
    let userDetails = await User.findById({ _id: userId }, { otp: 0,createdAt: 0,updatedAt: 0 });
    // user show data----------
    if (!userDetails) {
      return res.json({
        success: false,
        "massage": "user not found",
      })
    }
    res.json({
      "success": true,
      "massage": "successful",
      "data": userDetails
    })
    

  } catch (error) {
    res.json({
      "success": false,
      "error": error,
      "massage": "something went wrong",
    })
  }
}


// user profile saved ==============================================
// =================================================================
