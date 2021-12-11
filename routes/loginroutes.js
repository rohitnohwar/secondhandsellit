const express=require("express");
const app = express.Router()
const {login} = require("../controllers/logincontroller")

app.post("/login", login)

module.exports = app