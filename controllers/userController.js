const router = require('express').Router();
const { UserModel } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError, QueryError } = require('sequelize/lib/errors');
const User = require('../models/user');

router.get('/test', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try{
        const newUser = await UserModel.create({
            firstName,
            lastName, 
            email, 
            password: bcrypt.hashSync(password, 10),
        });

        const token = jwt.sign({id: newUser.id},
             process.env.JWT_SECRET, 
             {expiresIn: 60 * 60 * 24});

        res.status(201).json({
            message: "User Registered!",
            user: newUser,
            token
        })
    }catch(err){
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "Email already in use."
            });
        } else{
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        }
    }
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try{
        const loginUser = await UserModel.findOne({
            where: {email: email}
        });

        if(loginUser){
            let passwordComparison =  await bcrypt.compare(password, loginUser.password);

            if(passwordComparison){
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect password!"
                });
            }
        } else{
            res.status(401).json({
                message: "Email not found!"
            });
        }
    }catch(err){
        res.status(500).json({
            message: "Error logging in!"
        });
    };
});

//!  RESET USER PASSWORD
router.put('/:id', async (req, res) => {
    const { password, id } = req.body;
    const ownerId = req.body.id

    const query = {
        where: {
            id: id
        }
    }
    const updatedPW = {password:  bcrypt.hashSync(password, 13)}

    try {
        const update =  await UserModel.update(updatedPW, query);
            res.status(200).json({
                message: "Updated password", 
                id: ownerId,
                password: updatedPW
            });
    }   catch(err) {
        res.status(500).json({message: `Failed to update password. ${err}`})
    }
});

//!  DELETE ITEM
router.delete("/:id", async (req, res) =>{
    try {
        const locatedUser = await UserModel.destroy({
          where: { id: req.params.id },
        });
        res.status(200).json({ message: "user successfully removed", locatedUser});
      } catch (err) {
        res.status(500).json({ message: `Failed to remove user: ${err}` });
      }
    });

module.exports = router;