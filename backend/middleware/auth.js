const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "Token_Secret");
    if (new Date().getTime() < decodedToken.exp * 1000) {
      next();
    } else {
      throw "Token expiered";
    }
  } catch (error) {
    res.status(401).json({
      error: error | "Requête non authentifiée.",
    });
  }
};
