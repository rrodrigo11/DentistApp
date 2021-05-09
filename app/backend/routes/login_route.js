const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('../db/db_users');

 
 router.route('/').post(async (req, res)=>{
        let {email, password} = req.body; 
        //console.log(req.body); 
        let resp = ""; 
        resp+=email? '' : ' email,';
        resp+=password? '' : ' password,';
        if(resp.length>0){
            res.status(400).send({error: "faltan "+resp})
        }else{
            let user = await users.getUserByEmail(email);
            if(bcryptjs.compare(password, user.password)){
                console.log(user.email);
                let token = jwt.sign({email: user.email}, "Token Key", {expiresIn: '1h'});
                res.status(200);
                res.send({"token": token});
            }else{
                res.status(401).send({error:"Wrong password"})
            }

        }
 
    })
 

module.exports = router