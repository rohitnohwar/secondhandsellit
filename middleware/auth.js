require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth=(req, res, next)=>{
    let token = null;
    let username = null
    if (Object.entries(req.body).length === 0)
    {
        token = req.query["token"];
        username = req.query["username"];
    }
    else {
        token = req.body.token;
        username = req.body.username
    }
    
    try {
        
        const verified = jwt.verify(token, process.env.SECRET_KEY+username);
        if(verified){
            next();
            
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

module.exports = auth