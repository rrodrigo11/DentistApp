const router = require("express").Router();

const userController = require("../controller/user.controller");
const users = require('../db/db_users');
const auth = require('../middlewares/auth');

router.route('/:email')
    .get(auth.authToken, async(req, res)=>{
        let usr = await users.getUserByEmail(req.params.email);
        if(usr){
            res.status(200).send({resp: "TRUE"});
            return;
        }else{
            res.status(400).send({resp: "FALSE"});
            return;
        }
    })

// router.route('/')
//     .get(async (req,res)=>{
//         let token = req.get('x-auth');
//         console.log('i llega');
//         let email = await userController.getUserByEmail(token);
//         if(email){
//             res.status(200).send({email: email});
//             return;
//         }else{
//             res.status(400).send({resp: "FALSE"});
//             return;
//         }
//     })

module.exports = router