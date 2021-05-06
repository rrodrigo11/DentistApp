const router = require("express").Router();

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

module.exports = router