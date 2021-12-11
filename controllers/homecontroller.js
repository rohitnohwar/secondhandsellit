const mongoose=require("mongoose");
const User = require("../models/usermodel")
const upload = require("../middleware/multer")
const {uploadFile} = require("../awsbucket/awsbucket")
const fs=require("fs");
const Fuse=require("fuse.js");


function posts(req, res){
    User.find({}, function(err, foundUsers){
        foundUsers=foundUsers.map(o=>o.posts).flat();
        foundUsers.sort(function(a,b){
            return new Date(b.time) - new Date(a.time);
        });
        res.json({foundPosts:foundUsers});
    });
}

function search(req, res){
    User.find({}, function(err, foundUsers){
        foundUsers=foundUsers.map(o=>o.posts).flat();
        const fuse = new Fuse(foundUsers, {
            keys: ["item", "locality", "city"]
        });

        foundUsers = fuse.search(req.body.search)
        foundUsers = foundUsers.map(o => o.item);

        res.json({foundPosts:foundUsers});
    });
}

module.exports = {posts, search}