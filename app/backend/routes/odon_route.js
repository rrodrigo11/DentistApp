const express = require('express');
const router = express.Router();

const odon = require('../db/db_odon');
const auth = require('../middlewares/auth');

router.route('/:_id')//recibe como parámetro _id del historial
    .get( async(req, res)=>{
        let od = await odon.showOdonById(req.params._id);
        res.send(od);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        let historial_clinico_id = req.params._id;
        let {descripcion_general, dientes} = req.body;
        let faltan ="";

        faltan+=descripcion_general?'':'descripcion_general, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let newOd = await odon.saveOdon({historial_clinico_id, descripcion_general, dientes});

        if(newOd){
            res.status(201).send({odon: newOd});
        }else{
            res.status(400).send({error:"No se pudo guardar. Verifique los datos y su conexión"});
        }
    })
  
router.route('/odon/:_id')//recibe como parámetro _id del odontograma
    .get(async(req, res) => {
        let od = await odon.getOdonById(req.params._id);
        console.log(req.params._id);
        if(od){
            res.status(200).send(od);
            return;
        }
    })
    .delete(async(req, res) => {
        let od = await odon.showOdon();
        
        if(!od.find(o => o.id == req.params._id)){
            res.status(400).send({Error: "No existe el odontograma a eliminar."});
            return;
        }
        let deletedOd = await odon.deleteOdon(req.params._id);
        if(deletedOd){
            res.status(200).send({odontograma_eliminado: deletedOd});
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

module.exports = router