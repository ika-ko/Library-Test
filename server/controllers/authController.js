const db = require('../db');
const passport = require('passport');
const bcrypt = require('bcryptjs')

async function logIn(req,res,next){
    passport.authenticate("local",(err,user,info)=>{
        if(err) return next(err);
        if(!user) return res.status(401).json({message: info.message});
        req.logIn(user,(err)=>{
            if(err) return next(err);
            return res.json({id:user.id, username: user.username})
        });
    })(req,res,next);
}

async function signUp(req,res,next){
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({
            status:"error",
            message: "username and password are required"   
        })
    }
    const existingUser = await db.getUserByUsername(username);
    if(existingUser){
       return res.status(409).json({
            status:"error",
            message: "username is already taken"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await db.createUser(username,hashedPassword)
    return res.status(201).json({
        status:"success",
        user:{
            id:newUser.id,
            username: newUser.username,
        },
    })
}
async function getCurrentUser(req,res,next){
    if(!req.user) return res.status(401).json({message : "User not authenticated"});
    return res.status(200).json({id: req.user.id, username : req.user.username})
}
async function logOut(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        res.status(204).end();
    });
}
module.exports = {logOut,getCurrentUser,signUp,logIn};