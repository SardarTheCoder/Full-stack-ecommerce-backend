// yourJwtFile.js
const jwt = require('jsonwebtoken');
// SECRET_KEY
const SECRET_KEY = "hfdfdfdhfhdsghfhdfhsdgfgfagdgfgasgfsfgdhufhdjkshfgsdyf";

const generateToken = (userId) =>{
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "6h" });
    return token;
}

const getUserIdFromToken = (token) => {
    // Verify Token from jwt or decode the SECRET_KEY
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
}

module.exports = { generateToken, getUserIdFromToken };
