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

router.route('/:_id/:id')//mandar como parametros primero el id dentista y despues el id paciente
    .get(async(req, res)=>{
        let dentista_id = req.params._id;
        let paciente_id = req.params.id;
        let hst = await historial.showHistorialById(dentista_id, paciente_id);
        res.send(hst);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        console.log(req.params);
        let dentista_id = req.params._id;
        let paciente_id = req.params.id;
        let {date, motivo_de_consulta, enfermedad_actual, estudios, historial_clinico, observaciones} = req.body;
        let faltan ="";

        faltan+=date?'':'date, ';
        faltan+=motivo_de_consulta?'':'motivo_de_consulta, ';
        faltan+=observaciones?'':'observaciones, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let newHst = await historial.saveHistorial({dentista_id, paciente_id, date, motivo_de_consulta, enfermedad_actual, estudios, historial_clinico, observaciones});

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
router.route('/:_id')//_id del historial
    .get(async(req, res) => {
        let hst = await historial.getHistorialById(req.params._id);
        if(hst){
            res.status(200).send(hst);
            return;
        }
    })
    .delete(async(req, res) => {
        let hst = await historial.showHistorial();
        
        if(!hst.find(h => h._id == req.params._id)){
            res.status(400).send({Error: "No existe el historial a eliminar."});
            return;
        }
        let deletedHst = await historial.deleteHistorial(req.params._id);
        if(deletedHst){
            res.status(200).send({historial_eliminado: deletedHst});
        }else{
            res.status(400).send({error:"No se pudo eliminar. Verifique los datos y su conexión"});
        }
    })
    .put(async(req,res) => {
        let doc;
        let historial = await odon.getOdonById(req.params._id);
        let historial_clinico_id = historial.historial_clinico_id;
        let {descripcion_general, dientes} = req.body;
        try{
            doc = await odon.getOdonById(req.params._id);
            if(doc){
                await doc.actualizarOdon({historial_clinico_id, descripcion_general, dientes});
                res.status(200).send({odontograma_actualizado: doc});
            }
        }catch(err){
            res.status(404).send({error: "No se encontro el odontograma"}) 
        }
    })

module.exports = router;