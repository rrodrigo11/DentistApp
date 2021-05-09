const jwt = require('jsonwebtoken');

function authToken(req,res,next){
    let token = req.get('x-auth');
    if(token){
        jwt.verify(token, "Token Key", (err, decoded)=>{
            if(decoded){
                req.userCorreo = decoded.correo;
                console.log(req.userCorreo);
                next();
            }else{
                if(err.name == 'TokenExpiredError'){
                    res.status(401).send({error:"Your session expired."})
                }
                res.status(401).send({error:"Invalid token."});
            }
        })
    }else{
        res.status(401).send({error: "You're not authenticated."})
    }
}

function createtoken(req){
    return jwt.sign({email: req.email}, "Token Key", {expiresIn: '1h'});
}



module.exports = {authToken, createtoken};