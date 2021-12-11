const mongoose=require("mongoose");
const User = require("../models/usermodel")
const upload = require("../middleware/multer")
const {uploadFile, s3, bucketName} = require("../awsbucket/awsbucket")
const fs=require("fs");
const Fuse=require("fuse.js");
const {Post}=require("../models/postmodel")

async function entry(req, res){
    const date=new Date();
    const result=await uploadFile(req.file);
    const entry=new Post({
        item:req.body.item,
        name: req.body.name,
        number:req.body.number,
        email: req.body.email,
        address:req.body.address,
        locality:req.body.locality,
        city:req.body.city,
        time:date,
        image:req.file.filename
    });

    const pathToFile = "client/Images/"+req.file.filename;

    fs.unlink(pathToFile, function(err) {
        if (err) {
            throw err
        } 
    })

    User.findOne({username: req.body.email}, function(err, foundUser){
        foundUser.posts.push(entry);
        foundUser.save();
        res.send("");
    });
}


function userpostsget(req, res){
    User.findOne({username:req.query["username"]}, function(err, foundUser){
        foundUser=foundUser.posts;
        foundUser.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUser});
    });
}

function userpostspost(req, res){
    User.findOne({username:req.body.username},function(err, foundUser){
        foundUser=foundUser.posts;
        foundUser.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUser});
    });
}

function deletepost(req, res){

    const params={
        Bucket: bucketName,
        Key:req.body.image
    }

    s3.deleteObject(params, function(err,data){
        if(err){
            throw err;
        }
    })

    User.findOneAndUpdate({username:req.body.username}, {$pull:{posts:{_id:req.body._id}}}, function(err, foundList){
        if(err){
            console.log(err);
        }

        User.findOne({username:req.body.username}, function(err, foundUser){
            foundUser=foundUser.posts;
            foundUser.sort(function(a,b){
                return new Date(b.time) - new Date(a.time);
            });
            res.json({foundPosts:foundUser});
        });
    });
}

module.exports={entry, userpostspost, userpostsget, deletepost}