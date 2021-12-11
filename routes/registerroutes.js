const express=require("express");
const app = express.Router()
const {register} = require("../controllers/registercontroller")

app.post("/register", register)

module.exports = app