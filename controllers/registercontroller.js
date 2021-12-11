const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/usermodel")

function register(req, res){
    User.exists({username:req.body.username}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
            if(!doc){
                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    if(err){
                        console.log(err);
                    }
                    else {
                        const newUser= new User({
                            username:req.body.username,
                            email:req.body.username,
                            name:req.body.name,
                            password:hash
                        });
                        newUser.save();
                        res.json({message:"User account created"});
                    }
                })
            }
            else{
                res.json({message:"User account already exists"});
            }
        }
    });
}

module.exports = {register}