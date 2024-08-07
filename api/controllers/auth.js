const User = require("../models/User.js")
const bcrypt = require('bcryptjs');
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser  = new User({
            ...req.body,
            password:hash,
            
        })

        await newUser.save()
        res.status(201).json({message:"User created successfully"})

    }catch(err){
        next(err)
    }
}

//login
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, 'User not found!'));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(404, 'Wrong password or username!'));
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
        }).status(201).json({
            details: { ...otherDetails },
            isAdmin,
            accessToken: token 
        });
    } catch (err) {
        next(err);
    }
};

module.exports={
    register,
    login
}