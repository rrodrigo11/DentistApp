const express = require('express');
const router = express.Router();
const historial = require('../db/db_historial');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /:
 *  post:
 *      description: get all records
 *      parameters:
 *          - in: query
 *              name: search
 *              description: search all records
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/')
    .get(auth.authToken, async(req, res)=>{
        let hst = await historial.showHistorial();
        res.send(hst);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        let {dentista_id, paciente_id, date, motivo_de_consulta, enfermedad_actual, estudios, checkbox, observaciones} = req.body;
        let faltan ="";

        faltan+=dentista_id?'':'dentista_id, ';
        faltan+=paciente_id?'':'paciente_id, ';
        faltan+=date?'':'date, ';
        faltan+=motivo_de_consulta?'':'motivo_de_consulta, ';
        faltan+=observaciones?'':'observaciones, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let newHst = await historial.saveHistorial({dentista_id, paciente_id, date, motivo_de_consulta, enfermedad_actual, estudios, checkbox, observaciones});

        if(newHst){
            res.status(201).send({historial: newHst});
        }else{
            res.status(400).send({error:"No se pudo guardar. Verifique los datos y su conexión"});
        }
    })

/**
 * @swagger
 * /:
 *  post:
 *      description: get, delete and create records
 *      parameters:
 *          - in: query
 *              name: search, delete and create
 *              description: search, delete and create records with user's email
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: success call to the endpoint
 */
router.route('/:id')
    .get(auth.authToken, async(req, res) => {
        let hst = await historial.getHistorialById(req.params.id);
        if(hst){
            res.status(200).send(hst);
            return;
        }
    })
    .delete(async(req, res) => {
        let hst = await historial.showHistorial();
        
        if(!hst.find(h => h.id == req.params.id)){
            res.status(400).send({Error: "No existe el historial a eliminar."});
            return;
        }
        let deletedHst = await historial.deleteHistorial(req.params.id);
        if(deletedHst){
            res.status(200).send({historial_eliminado: deletedHst});
        }else{
            res.status(400).send({error:"No se pudo eliminar. Verifique los datos y su conexión"});
        }
    })

module.exports = router;