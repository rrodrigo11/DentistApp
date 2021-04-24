const express = require('express');
const router = express.Router();
// const bcryptjs = require('bcryptjs');
// const users = require('../DB/users');
// const jwt = require('jsonwebtoken');

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
        let resp = ""; 
        resp+=email? '' : ' correo,';
        resp+=password? '' : ' password,';
        if(resp.length>0){
            res.status(400).send({error: "faltan "+resp})

        }else{
            // let user = await users.getUserByEmail(email);
            // if(bcryptjs.compareSync(password, user.password)){
            //     console.log(user.email)
            //     let token = jwt.sign({correo:user.email}, "clave de tokens", {expiresIn: '1h'});
            //     res.send({"token": token, "rol": user.rol});
            // }else{
            //     res.status(401).send({error:"verificar password"})
            // }

           // user.token = user.token? user.token:  shortid.generate()+'-'+user.id; 
            //res.send({token: user.token})
            console.log(resp);
        }

    })

module.exports = router