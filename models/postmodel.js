const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    item: {type:String, required:true},
    name: {type:String, required:true},
    number: {type:Number, required:true},
    email: {type:String, required:true},
    address: {type:String, required:true},
    locality: {type:String, required:true},
    city: {type:String, required:true},
    time: {type:Date, required:true},
    image:{type:String, required:true}
});

const Post = mongoose.model("Post", postSchema);

module.exports = {postSchema, Post}