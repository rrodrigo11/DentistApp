const express = require('express');
const router = express.Router();
const pacientes = require('../db/db_pacientes');
const auth = require('../middlewares/auth');
const fileUpload = require('../multer-s3/s3');

router.route('/:_id')//recibe como parámetro _id del dentista
    .get( async(req, res)=>{
        console.log("llega arriba")
        let ptt = await pacientes.showPacientesById(req.params._id);
        res.send(ptt);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        let idDentista = req.params.id;
        let {name, email, password, phone, address, weight, height} = req.body;
        let faltan ="";
        let image="";
        password=email;
        // faltan+=name?'':'name, ';
        // faltan+=email?'':'email, ';
        // faltan+=password?'':'password, ';
        // faltan+=phone?'':'phone, ';
        // console.log(faltan.length);

        // if(faltan.length>0){
        //     res.status(400).send({error: "faltan datos."});
        //     console.log("falta: ", faltan);
        //     return;
        // }

        let ptt = await pacientes.showPacientes();

        for (let i = 0; i < ptt.length; i++) {
            if(ptt[i].email == email){
                res.status(400).send({Error: "Ya existe un paciente con esa información."});
                return;
            }  
        }
        console.log({name, email, password, phone, image, idDentista, address, weight, height});

        

        // let image = fileUpload(req, res, async(err) => {
        //     if(err){
        //         res.json(err);
        //     }else{ 
        //         if (req.file === undefined) {
        //             res.json('No image selected');
        //         } else {
        //             let img = req.file.key;
        //             let file = JSON.stringify(img);
        //             console.log(file);
        //             res.json(img);
        //             return file;
        //         }
        //     }
        // })

        // console.log(image);

        let newPtt = await pacientes.savePacientes({name, email, password, phone, image, idDentista, address, weight, height});

        if(newPtt){
            res.status(201).send({paciente: newPtt});
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
router.route('/pp/:email')//email del paciente
    .delete(async(req, res) => {
        let ptt = await pacientes.showPacientes();
        
        if(!ptt.find(p => p.email == req.params._id)){
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
    .put(async(req, res)=>{
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
    .get(async(req, res)=>{
        let ptt = await pacientes.getPacienteByEmail(req.params.email);
        console.log(req.params.email);
        if(ptt){
            res.status(200).send(ptt);
            return;
        }
    })


module.exports = router;