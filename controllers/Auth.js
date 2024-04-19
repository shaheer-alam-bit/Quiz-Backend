const Users = require ('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req,res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        if (!email.match(/^\S+@\S+\.\S+$/)) return res.json({msg: 'Invalid Email Address format.'}); // Check the email format

        let user = await Users.findOne({email});
        if (user) return res.json({msg: 'USER EXISTS'});
        if ( password.length < 8 ||         // Check the length of the password
            !password.match(/[0-9]/) ||     // Check the presence of a number
            !password.match(/[a-z]/) ||     // Check the presence of a lowercase letter
            !password.match(/[A-Z]/)) return res.json({msg:"Your password must be at least 8 characters long, contain at least one number, and have a mixture of uppercase and lowercase letters."})
        
        await Users.create({name,email, password: await bcrypt.hash(password, 5), isAdmin});

        return res.json({msg: 'USER CREATED'});
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({msg: 'Validation Error:', error: error.message});
        }
        console.error(error);
    }
}

const login = async (req,res) => {
    try {
        const {email , password} = req.body;
        const user = await Users.findOne({email});
        if (!user) return res.json({msg: 'USER NOT FOUND'});

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({msg: 'WRONG PASSWORD'});

        const token = jwt.sign({
            email,
            isAdmin: user.isAdmin,
        }, 'MY_SECRET', {expiresIn: '1d'});
        res.json({
            msg: 'LOGGED IN', token, isAdmin: user.isAdmin
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {signUp,login}