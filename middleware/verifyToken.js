const jwt = require('jsonwebtoken');
const UserModel =require("../models/userModel")

exports.verifyToken = async (req, res, next) => {
  console.log(req.headers.authorization);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ error: 'Unauthorized - No Authorization header provided' });
  }

  const authorizationParts = authorizationHeader.split(' ');

  if (authorizationParts.length !== 2 || authorizationParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).send({ error: 'Unauthorized - Invalid Authorization header format' });
  }

  const token = authorizationParts[1];

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized - No token provided' });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = await UserModel.findById(decoded._id); 
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
