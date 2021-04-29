const express = require('express');
const router = express.Router();
const users = require('../db/db_users');
const auth = require('../middlewares/auth');

const bcryptjs = require('bcryptjs');

/**
 * @swagger
 * /:
 *  post:
 *      description: get all users and create new users
 *      parameters:
 *          - in: query
 *              name: search
 *              description: search query param
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */

router.route('/')
    .get(auth.authToken, async(req, res)=>{
        let usr = await users.showUsers();
        res.send(usr);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        let {name, email, password, image, pacientes} = req.body;
        let faltan ="";

        faltan+=name?'':'name, ';
        faltan+=email?'':'email, ';
        faltan+=password?'':'password, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let usr = await users.showUsers();

        for (let i = 0; i < usr.length; i++) {
            if(usr[i].email == email){
                res.status(400).send({Error: "Ya existe un usuario con esa información."});
                return;
            }  
        }

        let newUser = await users.saveUsers({name, email, password, image, pacientes});

        if(newUser){
            res.status(201).send({usuario: newUser});
        }else{
            res.status(400).send({error:"No se pudo guardar. Verifique los datos y su conexión"});
        }
    })

/**
 * @swagger
 * /:
 *  post:
 *      description: delete and modify users
 *      parameters:
 *          - in: query
 *              name: delete and modify
 *              description: delete and modify users with user's email
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/:email')
    .delete(async(req, res) => {
        let usr = await users.showUsers();
        
        if(!usr.find(u => u.email == req.params.email)){
            res.status(400).send({Error: "No existe el usuario a eliminar."});
            return;
        }
        let deletedUsr = await users.deleteUsers(req.params.email);
        if(deletedUsr){
            res.status(200).send({usuario_eliminado: deletedUsr});
        }else{
            res.status(400).send({error:"No se pudo eliminar. Verifique los datos y su conexión"});
        }
    })
    .put(auth.authToken, async(req, res)=>{
        if(req.params.email == req.body.email){
            let doc;
            try{
                doc = await users.getUserByEmail(req.params.email);
                if(doc){
                    await doc.actualizarUsuario(req.body);
                    res.send();
                }
            }catch(err){
                res.status(404).send({error: "No se encontro el usuario"})
            }
        }else{
            res.status(400).send({error:"No se debe de cambiar el correo."})
        }
    })
    .get(auth.authToken, async(req, res)=>{
        let usr = await users.getUserByEmail(req.params.email);
        if(usr){
            res.status(200).send(usr);
            return;
        }
    })


module.exports = router;