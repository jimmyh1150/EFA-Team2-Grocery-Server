const express = require("express");
const router = express.Router();
const {forgotPassword} = require("..controllers/auth");

router.put('/forgot-password', forgotPassword);

module.exports = router;

exports.forgotPassword = (req, res) => {
    const {email} = req.body;

    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "User with this email does not exist"})
        }
        
        const token = jwt.sign({_id: user._id}, process.env.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
        const data = {
            from: 'noreply@changeyourpassword.com',
            to: email,
            subject: 'Password Reset Link',
            html:
            `
            <h2>Please click on link to reset your password</h2>
                                        //! this route needs to be added to client side ()
            <p>${process.env.CLIENT_URL}/resetpassword/$token}</p>
            `
        };
    })
}
