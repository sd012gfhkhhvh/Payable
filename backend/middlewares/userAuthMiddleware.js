const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const JWT_SECRET = process.env.JWT_SECRET;

const userAuthMiddleware = (req, res, next) => {
    //verify jwt token
    const authHeader  = req.headers.authorization; // Bearer <token>

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Not a valid token"});
    }

    try {
        const decodedValue = jwt.verify(actualToken, JWT_SECRET)
        req.username = decodedValue.username; // send the decoded username along
        next();
    }catch(err) {
        console.log(err.message);
        res.status(403).json({message: "Not a valid token"});
    }
}

module.exports = userAuthMiddleware;