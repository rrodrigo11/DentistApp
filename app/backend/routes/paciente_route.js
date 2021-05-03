const express = require('express');
const router = express.Router();
const pacientes = require('../db/db_pacientes');
const auth = require('../middlewares/auth');


router.route('/')
    .get(auth.authToken, async(req, res)=>{
        let ptt = await pacientes.showPacientes();
        res.send(ptt);
    })

router.route('/:_id')//recibe como parámetro _id del dentista
    .post(async(req, res)=>{
        console.log(req.body);
        let idDentista = req.params._id;
        let {name, email, password, phoneNumber, image, address, weight, height} = req.body;
        let faltan ="";

        faltan+=name?'':'name, ';
        faltan+=email?'':'email, ';
        faltan+=password?'':'password, ';
        faltan+=phoneNumber?'':'phoneNumber, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let ptt = await pacientes.showPacientes();

        for (let i = 0; i < ptt.length; i++) {
            if(ptt[i].email == email){
                res.status(400).send({Error: "Ya existe un paciente con esa información."});
                return;
            }  
        }

        let newPtt = await pacientes.savePacientes({name, email, password, phoneNumber, image, idDentista, address, weight, height});

        if(newPtt){
            res.status(201).send({usuario: newPtt});
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
    .delete(auth.authToken, async(req, res) => {
        let ptt = await pacientes.showPacientes();
        
        if(!ptt.find(p => p.email == req.params.email)){
            res.status(400).send({Error: "No existe el paciente a eliminar."});
            return;
        }
        let deletedPtt = await pacientes.deletePaciente(req.params.email);
        if(deletedPtt){
            res.status(200).send({paciente_eliminado: deletedPtt});
        }else{
            res.status(400).send({error:"No se pudo eliminar. Verifique los datos y su conexión"});
        }
    })
    .put(auth.authToken, async(req, res)=>{
        if(req.params.email == req.body.email){
            let doc;
            try{
                doc = await pacientes.getPacienteByEmail(req.params.email);
                if(doc){
                    await doc.actualizarPaciente(req.body);
                    res.send();
                }
            }catch(err){
                res.status(404).send({error: "No se encontro el paciente"})
            }
        }else{
            res.status(400).send({error:"No se debe de cambiar el correo."})
        }
    })
    .get(auth.authToken, async(req, res)=>{
        let ptt = await pacientes.getPacienteByEmail(req.params.email);
        if(ptt){
            res.status(200).send(ptt);
            return;
        }
    })


module.exports = router;