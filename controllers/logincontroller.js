const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/usermodel")

function login(req, res){
    const username= req.body.username;
    const password= req.body.password;

    User.findOne({username:username}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else if(!foundUser){
            res.json({auth:false, message:"User doesn't exist"});
        }
        
        else  if(foundUser){
            bcrypt.compare(password, foundUser.password, async function(err, response){
                if(response === true){
                    const token = await jwt.sign(
                        { name: foundUser.name, email:foundUser.email},
                        "secretkey",
                        { expiresIn: "30d" }
                      );
             
                    res.json({auth: true, foundUser:foundUser, name:foundUser.name, email:foundUser.email, message:"user exists", token:token});
                }
                else if(response===false){
                    res.json({ auth:false, message:"Incorrect credentials"});
                }
            });
        }
    });
}

module.exports = {login}