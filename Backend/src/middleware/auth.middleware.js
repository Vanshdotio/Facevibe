const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    let user;
    if (decoded.id) {
      user = await userModel.findById(decoded.id);
    } else if (decoded.email) {
      user = await userModel.findOne({ email: decoded.email });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or unauthorized."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token."
    });
  }
};

const authenticateToken = protect;

module.exports = { protect, authenticateToken };