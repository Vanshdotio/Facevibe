const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token signed with JWT_SECRET.
 * 
 * @param {string} userId - User Mongoose ID
 * @returns {string} Signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
