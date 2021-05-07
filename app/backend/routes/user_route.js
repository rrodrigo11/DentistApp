const express = require('express');
const router = express.Router();

const users = require('../db/db_users');
const patients = require('../db/db_pacientes');
const auth = require('../middlewares/auth');

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
    .get(async(req, res)=>{
        let usr = await users.showUsers();
        res.send(usr);
    })
    .post(async(req, res)=>{
        //console.log(req.body);
        let {name, email, password, image, terms, pacientes} = req.body;
        let faltan ="";

        faltan+=name?'':'name, ';
        faltan+=email?'':'email, ';
        faltan+=password?'':'password, ';
        //console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let usr = await users.showUsers();

        for (let i = 0; i < usr.length; i++) {
            if(usr[i].email == email){
                res.status(400).send({Error: "Ya existe un usuario con ese correo"});
                return;
            }  
        }

        let newUser = await users.saveUsers({name, email, password, image, terms, pacientes});

        if(newUser){
            let token = await auth.createtoken(newUser.email)
            console.log("Creacion exitosa de usuario y token");
            res.status(201).send({token: token});  
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
router.route('/:email')//recibe como parámetro email del dentista
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
    .put(async(req, res)=>{
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
    .get(async(req, res)=>{
        let usr = await users.getUserByEmail(req.params.email);
        if(usr){
            res.status(200).send(usr);
            return;
        }
    })

router.route('/addPaciente/:email')//recibe como parámetro email del dentista
    .get(async(req, res) => {
        let usr = await users.findOne({email: req.params.email});
        let arrUsr = [];
        console.log(usr);

        for (let p of usr.pacientes){
          console.log(p.pacientes)
          let ptt = await patients.findOne({_id: p.idPacientes})
          console.log(ptt)
	      arrUsr.push({idPaciente: ptt, paciente: p.paciente})
	    }
        console.log(arrUsr)
        if(arrUsr.length > 0){
            res.status(200).send(arrUsr);
        }else{
            res.status(404).send({error:"No hay pacientes registrados"});
        }
    })
    .post(async(req, res)=>{
        let usr = await users.findOne({email: req.params.email});
        let idPtt = req.body._id;
        console.log(idPtt);
        
        try{
            if(usr){
                let ptt = usr.pacientes.find(p => p.idPaciente == idPtt);
                if(ptt){
                    res.status(400).send({error:"El paciente ya ha sido registrado previamente"})
                }else{
                    await usr.savePacientes(idPtt);
                    res.status(200).send(usr);
                }
            }else{

                console.log("No se encontro el usuario")
            }
        }catch(err){
            console.log(err);
            res.status(404).send({error: "Database Failed"});
        }
    })
    .put(async (req, res) =>{
        let idPtt = req.body._id;
        let pttName = req.body.paciente;
        console.log(idPtt);
        console.log(pttName);
        let usr = await users.findOne({email: req.params.email});
        console.log(usr);
        try{
            if(usr){
                let ptt = usr.pacientes.find(p => p.idPaciente == idPtt);
                console.log(ptt);
                if(ptt){
                    await usr.actualizarPacientes(idPtt, pttName);
                    res.send(usr);
                }else{
                    res.status(404).send({error: "No se encontro el paciente"});
                }
            }else{
                console.log("No se encontro al usuario");
            }
        }catch(err){
            console.log(err);
            res.status(404).send({error: "Database Failed."});
        }
    })
    .delete(async (req, res) => {
        let idPtt = req.body._id;
        let usr = await users.findOne({email: req.params.email});
        try {
            if (usr) {
                let ptt = usr.pacientes.find(p => p.idPaciente == idPtt);
                console.log(ptt);
                if (ptt) {
                    await usr.deletePacientes(idPtt);
                    res.send(ptt);
                } else {
                    res.status(404).send({error: "No se encontro el paciente"});
                }
            } else {
                console.log('No se encontro el usuario');
            }
        } catch (err) {
            console.log(err);
            res.status(404).send({error: "Database Failed."});
        }
    })

router.route('/addHistorial/:email')//recibe como parámetro email del dentista
    .get()

module.exports = router;