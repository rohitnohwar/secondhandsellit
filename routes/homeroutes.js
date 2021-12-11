const express=require("express");
const app = express.Router()
const {posts, search} = require("../controllers/homecontroller")

app.get("/posts", posts)
app.post("/search", search)

module.exports = app