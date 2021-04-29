const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const users = require('../db/db_users');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /:
 *  post:
 *      description: dummy endpoint
 *      parameters:
 *          - in: body
 *              name: email, password
 *              description: login post
 *              schema:
 *                  type: object
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
 
 router.route('/')
    .post(async (req, res)=>{
        let {email, password} = req.body; 
        console.log(password+""); 
        let resp = ""; 
        resp+=email? '' : ' email,';
        resp+=password? '' : ' password,';
        if(resp.length>0){
            res.status(400).send({error: "faltan "+resp})
 
        }else{
            let user = await users.getUserByEmail(email);
            if(bcryptjs.compare(password, user.password)){
                console.log(user.email)
                let token = jwt.sign({email: user.email}, "Token Key", {expiresIn: '1h'});
                res.send({"token": token});
            }else{
                res.status(401).send({error:"Wrong password"})
            }

        }
 
    })
 
module.exports = router