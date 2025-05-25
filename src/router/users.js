const express = require('express');
const router = express.Router();

const { register, login, logout } = require("../controllers/userController.js");
const {authVerify} = require('../middleware/authVerify.js')

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authVerify, logout);


module.exports = router