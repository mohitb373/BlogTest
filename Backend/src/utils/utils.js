const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
require('dotenv').config();
module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    console.log("cdjcn")
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded,"cdjcn")
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
