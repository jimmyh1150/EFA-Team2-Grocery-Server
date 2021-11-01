const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const router = require('../controllers/userController');
const {UserModel} = require('../models');

const validateSession = async (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next();
    } else if (req.headers.authorization){
        const {authorization} = req.headers;
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;

        if (payload){
            let foundUser = await UserModel.findOne({
                where: {id: payload.id}
            });

            if (foundUser){             // If user is the same user as the request, move on
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({message: "Not authorized!"});
            };
        } else {                        // If payload (aka: token) is not the same
            res.status(401).send({message: "Invalid token!"});      // .send you can also use .json
        };
    } else {
        res.status(403).send({message: "Forbidden!"});
    };
};  

module.exports = validateSession;