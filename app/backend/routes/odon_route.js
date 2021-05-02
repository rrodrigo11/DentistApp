const express = require('express');
const router = express.Router();
const odon = require('../db/db_odon');
const auth = require('../middlewares/auth');

router.route('/')
    .get(auth.authToken, async(req, res)=>{
        let od = await odon.showOdon();
        res.send(od);
    })
    .post(async(req, res)=>{
        console.log(req.body);
        let {historial_clinico_id, descripcion_general} = req.body;
        let faltan ="";

        faltan+=historial_clinico_id?'':'historial_clinico_id, ';
        faltan+=descripcion_general?'':'descripcion_general, ';
        console.log(faltan.length);

        if(faltan.length>0){
            res.status(400).send({error: "faltan datos."});
            console.log("falta: ", faltan);
            return;
        }

        let newOd = await odon.saveOdon({historial_clinico_id, descripcion_general});

        if(newOd){
            res.status(201).send({odon: newOd});
        }else{
            res.status(400).send({error:"No se pudo guardar. Verifique los datos y su conexión"});
        }
    })
  
router.route('/:_id')
    .get(auth.authToken, async(req, res) => {
        let od = await odon.getOdonById(req.params.id);
        console.log(req.params.id);
        if(od){
            res.status(200).send(od);
            return;
        }
    })
    .delete(async(req, res) => {
        let od = await odon.showOdon();
        
        if(!od.find(o => o.id == req.params.id)){
            res.status(400).send({Error: "No existe el odontograma a eliminar."});
            return;
        }
        let deletedOd = await odon.deleteOdon(req.params.id);
        if(deletedOd){
            res.status(200).send({odontograma_eliminado: deletedOd});
        }else{
            res.status(400).send({error:"No se pudo eliminar. Verifique los datos y su conexión"});
        }
    })

module.exports = router